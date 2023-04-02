from flask import render_template, request, jsonify
from app import app,db
from app.models import Arceau

@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/esp32/<int:arceau_id>/info', methods=['GET','POST'])
def esp32_info(arceau_id):
    data = request.get_json() #récupère les données de l'ESP32 : batterie et état
    newState = data["state"]
    newBattery = data["battery"]
    arceau = Arceau.query.get(arceau_id)
    arceau.state = newState
    arceau.battery = newBattery
    return jsonify(action=arceau.action)

@app.route('/esp32')
def esp32():
    arceau_id=1
    arceau = Arceau.query.get(arceau_id)
    arceauState = arceau.state
    return render_template('esp32.html', arceauState=arceauState)

@app.route("/update_state/<int:arceau_id>", methods=["POST"])
def update_arceau_state(arceau_id):
    data = request.get_json()
    newAction = data["action"]
    arceau = Arceau.query.get(arceau_id)
    arceau.action = newAction
    db.session.commit()
    # Renvoyer une réponse HTTP vide avec un code 200 OK
    if newAction=="0":
        return "z"
    elif newAction=="1":
        return "u"
    elif newAction=="2":
        return "d"
    else:
        return "e"
    
@app.route("/get_state/<int:arceau_id>", methods=["POST"])
def get_state(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    return jsonify(state=arceau.state, battery=arceau.battery)




