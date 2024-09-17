from flask import Flask
from read_img import read_image
from grad_cam import GradCAM
import tensorflow as tf
import json


app = Flask(__name__)


@app.route('/')

def model_deploy(path):
	labels = {
		"Urban fabric": 0,
		"Industrial or commercial units": 1,
		"Arable land": 2,
		"Permanent crops": 3,
		"Pastures": 4,
		"Complex cultivation patterns": 5,
		"Land principally occupied by agriculture, with significant areas of natural vegetation": 6,
		"Agro-forestry areas": 7,
		"Broad-leaved forest": 8,
		"Coniferous forest": 9,
		"Mixed forest": 10,
		"Natural grassland and sparsely vegetated areas": 11,
		"Moors, heathland and sclerophyllous vegetation": 12,
		"Transitional woodland, shrub": 13,
		"Beaches, dunes, sands": 14,
		"Inland wetlands": 15,
		"Coastal wetlands": 16,
		"Inland waters": 17,
		"Marine waters": 18
	}
	with open('{path}/labels.geojson'.format(path=path)) as f:
		a = json.load(f)
		c = a['properties']['labels']
		d = [labels[k] for k in c]
	model = tf.keras.models.load_model('final_model')
	x = read_image(path)
	distribution, status = GradCAM(model, x, d, path)

	a['properties']['distribution'] = distribution
	a['properties']['status'] = status
	with open("/content/drive/MyDrive/SIH/output/{i}/labels.geojson".format(i=j), "w") as outfile:
		json.dump(a, outfile)

if __name__ == '__main__':
	app.run()