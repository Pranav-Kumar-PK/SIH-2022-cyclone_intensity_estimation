from textwrap import wrap

import cv2
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import tensorflow.keras as K
from tensorflow.keras.models import Model


def GradCAM(model, image, y_true, path, interpolant=0.0015):
    labels = [
        "Urban fabric",
        "Industrial or commercial units",
        "Arable land",
        "Permanent crops",
        "Pastures",
        "Complex cultivation patterns",
        "Land principally occupied by agriculture, with significant areas of natural vegetation",
        "Agro-forestry areas",
        "Broad-leaved forest",
        "Coniferous forest",
        "Mixed forest",
        "Natural grassland and sparsely vegetated areas",
        "Moors, heathland and sclerophyllous vegetation",
        "Transitional woodland, shrub",
        "Beaches, dunes, sands",
        "Inland wetlands",
        "Coastal wetlands",
        "Inland waters",
        "Marine waters",
    ]

    last_conv_layer = next(
        x for x in model.layers[::-1] if isinstance(x, K.layers.Conv2D)
    )
    target_layer = model.get_layer(last_conv_layer.name)

    rgb_image = []
    rgb_image.append(
        tf.math.add(
            tf.multiply(image[2], tf.constant(675.88746967)), tf.constant(590.23569706)
        )
    )
    rgb_image.append(
        tf.math.add(
            tf.multiply(image[1], tf.constant(582.87945694)), tf.constant(614.21682446)
        )
    )
    rgb_image.append(
        tf.math.add(
            tf.multiply(image[0], tf.constant(572.41639287)), tf.constant(429.9430203)
        )
    )
    rgb_image = tf.stack(tf.squeeze(rgb_image)).numpy().transpose(1, 2, 0)
    rgb_image = tf.maximum(rgb_image, 0) / tf.math.reduce_max(rgb_image).numpy()

    true_label_indexes = y_true
    #     patch_name = patch_name.decode("utf-8")
    #     print(true_label_indexes)
    distribution = {}
    status = {}
    tf.keras.utils.save_img('/content/drive/MyDrive/SIH/output/{i}/original.png'.format(i = path), rgb_image)

    # Compute Gradient of Top Predicted Class
    with tf.GradientTape(persistent=True) as tape:
        gradient_model = Model([model.inputs], [target_layer.output, model.output])
        tape.watch(gradient_model.get_layer(last_conv_layer.name).variables)
        conv2d_out, prediction = gradient_model(image)
        # Obtain the Prediction Loss

        for i, loss in enumerate(prediction[0]):
            if i in true_label_indexes:
                # Gradient() computes the gradient using operations recorded
                # in context of this tape
                gradients = tape.gradient(loss, conv2d_out)

                # Obtain Depthwise Mean
                weights = tf.reduce_mean(gradients, axis=(0, 1, 2))
                heatmap = conv2d_out @ weights[..., tf.newaxis]
                heatmap = tf.squeeze(heatmap)
                heatmap = heatmap.numpy()

                heatmap = cv2.resize(
                    heatmap, (image[0].shape[1], image[0].shape[1]), fx=0, fy=0
                )
                jet_heatmap = cv2.normalize(
                    heatmap,
                    None,
                    alpha=0,
                    beta=255,
                    norm_type=cv2.NORM_MINMAX,
                    dtype=cv2.CV_8U,
                )

                grey = cv2.cvtColor(jet_heatmap, cv2.COLOR_BGR2RGB)
                jet_heatmap = cv2.applyColorMap(jet_heatmap, cv2.COLORMAP_JET)

                jet_heatmap = cv2.cvtColor(jet_heatmap, cv2.COLOR_BGR2RGB)
                thresh = 127
                im_bw = cv2.threshold(grey, thresh, 255, cv2.THRESH_BINARY)[1]

                distribution[labels[i]] = (np.count_nonzero(im_bw == 255) / 43200) * 100
                rgb_image = np.array(rgb_image)
                result = (255 - im_bw) + rgb_image

                # Superimpose the heatmap on original image
                superimposed_img = jet_heatmap * interpolant + rgb_image
                superimposed_img = tf.keras.preprocessing.image.array_to_img(
                    superimposed_img
                )
                t_label = False
                p_label = False

                true_labels = ""
                true_labels += "[{}] {} ".format(i, labels[i])

                # Save the superimposed image
                fig, (ax1, ax2, ax3, ax4, ax5) = plt.subplots(1, 5)

                #                 plt.figure(figsize=(5, 10))
                my_dpi = 96
                fig.set_size_inches(18.5, 10.5, forward=True)
                if i in true_label_indexes:
                    t_label = True
                    ax1.set_title(
                        "\n".join(wrap("True label: " + true_labels, 45)),
                        fontsize=8,
                        wrap=True,
                        color="g",
                    )
                else:
                    ax1.set_title(
                        "\n".join(wrap("True label: " + true_labels, 45)),
                        fontsize=8,
                        wrap=True,
                        color="r",
                    )
                ax1.axes.xaxis.set_visible(False)
                ax1.axes.yaxis.set_visible(False)
                ax1.imshow(rgb_image)
                ax2.axes.xaxis.set_visible(False)
                ax2.axes.yaxis.set_visible(False)
                ax2.imshow(jet_heatmap)
                ax2.set_title(
                    "\n".join(wrap("Activation Map")),
                    fontsize=8,
                    wrap=True,
                    color="b",
                )
                ax2.axes.xaxis.set_visible(False)
                ax2.axes.yaxis.set_visible(False)
                ax2.imshow(grey)
                if loss.numpy() >= 0.5:
                    p_label = True
                    status[labels[i]] = 'True Positive'

                    ax3.set_title(
                        "\n".join(
                            wrap(
                                "Grad CAM"
                            )
                        ),
                        fontsize=8,
                        wrap=True,
                        color="g",
                    )
                else:
                    status[labels[i]] = 'False Negative'
                    ax3.set_title(
                        "\n".join(
                            wrap(
                                "Grad CAM"
                            )
                        ),
                        fontsize=8,
                        wrap=True,
                        color="r",
                    )
                ax3.axes.xaxis.set_visible(False)
                ax3.axes.yaxis.set_visible(False)
                ax3.imshow(superimposed_img)
                ax4.set_title(
                    "\n".join(wrap("Activation Mask" + " [D="
                                   + str(np.around(np.count_nonzero(im_bw == 255) / 43200, 2)) + "]")),

                    fontsize=8,
                    wrap=True,
                    color="b",
                )
                ax4.axes.xaxis.set_visible(False)
                ax4.axes.yaxis.set_visible(False)
                ax4.imshow(im_bw)
                if loss.numpy() >= 0.5:
                    p_label = True
                    ax5.set_title(
                        "\n".join(wrap("SHAP")),
                        fontsize=8,
                        wrap=True,
                        color="b",
                    )
                else:
                    ax5.set_title(
                        "\n".join(wrap("SHAP")),
                        fontsize=8,
                        wrap=True,
                        color="r",
                    )

                ax5.axes.xaxis.set_visible(False)
                ax5.axes.yaxis.set_visible(False)
                ax5.imshow(result)
                #                 plt.tight_layout()

                plt.savefig("4" +
                            str(labels[i]) + ".png",
                            bbox_inches="tight",
                            dpi=my_dpi
                            )
                plt.close(fig)
    return distribution, status