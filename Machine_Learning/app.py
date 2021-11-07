from flask import Flask, redirect, url_for, request, jsonify, make_response
from json import dumps
import fetch_products as fp
import pandas as pd

import recommender as rc

app = Flask(__name__)

@app.route("/startServer",methods=['GET'])
def startServer():
	return jsonify({"response":"Server is on"})

@app.route("/getRecommendation",methods=['POST'])
def getSomething():
	text = request.json['text']
	#print(text)
	products,specs = fp.get_products(text)
	#print(products)
	#print(specs)
	arr = ""#pd.Series([])
	img = ""#pd.Series([])
	if len(products)!=0:
		arr,img = rc.get_recommendations(products[0], specs)
	print('got ',arr,img)	
	#print("type is ",type(arr),' ', type(img))
	#print(arr,' ',img)
	product_to_Send = arr#''
	link_to_img = img#''
	#for x,y in zip(arr,img):
	#	print(type(x),' ',type(y))
	#	product_to_Send = x
	#	link_to_img = y
	#	break
	return jsonify({"product":product_to_Send,"url":link_to_img})#make_response(dumps(arr))

if __name__ == "main":
	#app.debug = False
	port = int(os.environ.get('PORT',33507))
	#app.run(host='127.0.0.1:5000',debug=True)
	waitress.serve(app,port=port)