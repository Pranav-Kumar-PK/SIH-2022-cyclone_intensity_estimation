from flask import Flask
app = Flask(__name__)

# run "venv\Scripts\activate" in terminal to activate the venv
# run "python index.py" in terminal to start the server

@app.route('/predict', methods=['GET'])
def predict():
    return {"name": "Pranav"}

if __name__ == "__main__":
    app.run(debug=True)