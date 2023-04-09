from flask import render_template, request, jsonify, redirect, url_for, session, flash
from flask_login import current_user, login_user, logout_user, login_required
from werkzeug.urls import url_parse
from app import app,db
from app.models import Arceau, User
from app.forms import LoginForm

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/esp32/<int:arceau_id>/info', methods=['GET','POST'])
def esp32_info(arceau_id):
    data = request.get_json() #récupère les données de l'ESP32 : batterie et état
    newState = data["state"]
    newBattery = data["battery"]
    arceau = Arceau.query.get(arceau_id)
    arceau.state = newState
    arceau.battery = newBattery
    db.session.commit()
    return "OK"

@app.route('/esp32/<int:arceau_id>/action', methods=['GET'])
def esp32_action(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    action = arceau.action
    return str(action)

@app.route('/esp32/', methods=["POST"])
def esp32(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    arceauState = arceau.state
    arceauBattery = arceau.battery
    return render_template('esp32.html', arceauState=arceauState, arceauBattery=arceauBattery)

@app.route("/update_state/<int:arceau_id>", methods=["POST"])
def update_arceau_state(arceau_id):
    data = request.get_json()
    newAction = data["action"]
    arceau = Arceau.query.get(arceau_id)
    arceau.action = newAction
    db.session.commit()
    # Renvoyer une réponse HTTP vide avec un code 200 OK
    return 'ok'
    
@app.route("/get_state/<int:arceau_id>", methods=["POST"])
def get_state(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    return jsonify(state=arceau.state, battery=arceau.battery)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('user', user_id=session['user_id']))
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        session['user_id']=user.id
        return redirect(url_for('user', user_id=session['user_id']))
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/user/<int:user_id>')
@login_required
def user(user_id):
    arceaux = Arceau.query.filter_by(admin_user_id=user_id).all()
    arceauState = [arceau.state for arceau in arceaux]
    arceauBattery = [arceau.battery for arceau in arceaux]
    arceauId = [arceau.id for arceau in arceaux]
    return render_template('user.html', arceauState=arceauState, arceauBattery=arceauBattery, arceauId=arceauId)



