import numpy
import cv2
import numpy as np
from PIL import Image

def read_image(path):
    x = []


    imarray = numpy.zeros((120,120))
    x.append(imarray)
    im = Image.open('{path}/{path}-BAND2.tif'.format(path = path))
    im = numpy.array(im)
    imarray = cv2.resize(
                        im, (120, 120), fx=0, fy=0
                    )
    x.append(imarray)
    im = Image.open('{path}/{path}-BAND3.tif'.format(path = path))
    im = numpy.array(im)
    imarray = cv2.resize(
                        im, (120, 120), fx=0, fy=0
                    )
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)
    im = Image.open('{path}/{path}-BAND4.tif'.format(path = path))
    im = numpy.array(im)
    imarray = cv2.resize(
                        im, (120, 120), fx=0, fy=0
                    )
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)
    imarray = numpy.zeros((60,60))
    x.append(imarray)

    y = []
    for i in x:
        a = len(i)
        y.append(np.reshape(i,(1,a,a)))

    return y