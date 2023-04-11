from flask import render_template, request, jsonify, redirect, url_for, session, flash
from flask_login import current_user, login_user, logout_user, login_required, LoginManager
from werkzeug.urls import url_parse
from app import app,db
from app.models import Arceau, User
from app.forms import LoginForm

#Redirection to login page for cases of acces of unauthorized pages
login_manager = LoginManager()
@login_manager.unauthorized_handler
def unauthorized():
    return redirect(url_for('login'))

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

#Get information on the actual state of the arceau (data sent by ESP32)
@app.route('/esp32/<int:arceau_id>/info', methods=['GET','POST'])
def esp32_info(arceau_id):
    arceau = Arceau.query.get(arceau_id) 
    data = request.get_json()           #Get data from ESP32
    arceau.state = data["state"]        #Update on DB state of the arceau 
    arceau.battery = data["battery"]    #Update on DB battery of the arceau 
    db.session.commit()                 
    return "ok"

#Write on a page command for the arceau (data read by ESP32)
@app.route('/esp32/<int:arceau_id>/action', methods=['GET'])
def esp32_action(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    return str(arceau.action)   #Data sent under a string form

#Update command for the arceau in the db (data send by webpage)
@app.route("/update_state/<int:arceau_id>", methods=["POST"])
def update_arceau_state(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    data = request.get_json()           #Get data from webpage
    arceau.action = data["action"]      #Update on DB action for the arceau
    db.session.commit()
    return "ok"

#Write on a page state of the arceau for the website (data read by webpage) 
@app.route("/get_state/<int:arceau_id>", methods=["POST"])
def get_state(arceau_id):
    arceau = Arceau.query.get(arceau_id)
    return jsonify(state=arceau.state, battery=arceau.battery) #Data sent in a json form

#Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated: #data from serveur session
        return redirect(url_for('user', user_id=session['user_id']))
    form = LoginForm()  #forms for HTML page, written on forms.py
    if form.validate_on_submit():   
        user = User.query.filter_by(email=form.email.data).first()
        if user is None or not user.check_password(form.password.data): #verifying data on server side and using hash only
            flash('Invalid username or password')
            return redirect(url_for('login'))
        login_user(user, remember=form.remember_me.data)
        session['user_id']=user.id  #save user_id on session
        return redirect(url_for('user', user_id=session['user_id'])) 
    return render_template('login.html', form=form)

#Logout page
@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

#User page
@app.route('/user/<int:user_id>')
@login_required #can't be accessed without login from the user
def user(user_id):
    arceaux = Arceau.query.filter_by(admin_user_id=user_id).all()
    arceauState = [arceau.state for arceau in arceaux] #get all arceau owned by the user
    arceauBattery = [arceau.battery for arceau in arceaux]
    arceauId = [arceau.id for arceau in arceaux]  
    return render_template('user.html', arceauState=arceauState, arceauBattery=arceauBattery, arceauId=arceauId) #send all those arceau to html page



