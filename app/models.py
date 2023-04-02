from app import db

class Arceau(db.Model):
    id = db.Column(db.Integer, primary_key=True, unique=True)
    battery = db.Column(db.Integer, default=0)
    state = db.Column(db.Integer, default=0)
    action = db.Column(db.Integer, default=0)
    arceau_group = db.Column(db.Integer, default=0)
    admin_user_id = db.Column(db.Integer, default=0)

    def __repr__(self):
        return '<Arceau {}>'.format(self.id)