from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import os

import requests

import urllib, json
import urllib.request

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3308/eyewear'# configure according to your local mysql settings
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)
class Eyewear(db.Model):
    __tablename__ = 'eyewear'

    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float, nullable=False)
    url = db.Column(db.String(255), nullable=False)

    def __init__(self, id, category, name, price, url):
        self.id = id
        self.category = category
        self.name = name
        self.price = price
        self.url = url

    def json(self):
        return {"id": self.id, "category": self.category,
                "name": self.name, "price": self.price, "url": self.url}

eyewear_data_url = "http://139.59.244.121/my_items" ### API URL (given)

### when user starts shopping (to load Category Selection Screen)
@app.route("/view/all")
def get_all():

    category_all_list = []
    try:
        print("Getting data from eyewear API.")
        
        response = urllib.request.urlopen(eyewear_data_url)

        data = json.loads(response.read())

        print("Clear all existing data from eyewear table.")
        db.session.query(Eyewear).delete()
        db.session.commit()

        for item in data:
            id = item["id"] #int
            category = item["category"] #str
            name = item["name"] #str
            price = item["price"] #int
            url = item["url"] #str

            if category not in category_all_list:
                category_all_list.append(category)

            insert_eyewear = Eyewear(id=id, category=category, name=name, price=price, url=url)
            db.session.add(insert_eyewear)
            db.session.commit()
        # OUTSIDE for loop
        print("Done with insertion of all data from eyewear objects API to MySQL database.")
    
    except: ### got error in runniing eyewear objects API
        print("Error in running eyewear objects API")
        return jsonify(
            {
                "code": 404,
                "message": "There are no results for this eyewear objects API URL."
            }
        ), 404
    ### no error in runniing eyewear objects API
    return jsonify(
            {
                "code": 200,
                "message": "Success in getting all data from eyewear objects API URL.",
                "data": category_all_list
            }
        ), 200
    

### when user clicks on "Spectacles"/"Sunglasses"/another category on Category Selection Screen
@app.route("/view/<string:eyewear_type>")
def get(eyewear_type):

    eyewear_type_data = Eyewear.query.filter_by(category=eyewear_type).all() # query
    print("Run a MySQL query to get data for 1 category.")

    if len(eyewear_type_data): # if query is successful
        return jsonify(
            {
                "code": 200,
                "message": "Category chosen is " + eyewear_type + " and success in getting data.",
                "data": [eyewear.json() for eyewear in eyewear_type_data]
            }
        ), 200
    else: # if query failed
        return jsonify(
            {
                "code": 404,
                "message": "Error in getting data for chosen category, "  + eyewear_type + "."
            }
        ), 404


# Execute this program if it is run as a main script (not by 'import')
if __name__ == "__main__":
    print("This is flask " + os.path.basename(__file__) + " to get all the eyewear objects.")
    app.run(host='0.0.0.0', port=5000, debug=True)