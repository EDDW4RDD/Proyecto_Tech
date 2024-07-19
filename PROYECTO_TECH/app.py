from flask import Flask, render_template, g, url_for
import sqlite3
import os

app = Flask(__name__)

# Configura la ruta de tu base de datos SQLite
DATABASE = os.path.join(os.path.dirname(__file__), 'proyecto.db')

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    cur = get_db().cursor()
    cur.execute("SELECT * FROM Productos")
    products = cur.fetchall()
    return render_template('Index.html', products=products)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/marcas')
def marcas():
    return render_template('Marcas.html')

@app.route('/Productos')
def Productos():
    return render_template('Productos.html')

@app.route('/producto2')
def producto2():
    return render_template('Producto2.html')

@app.route('/producto3')
def producto3():
    return render_template('Producto3.html')

@app.route('/producto4')
def producto4():
    return render_template('Producto4.html')

@app.route('/producto5')
def producto5():
    return render_template('Producto5.html')

@app.route('/producto6')
def producto6():
    return render_template('Producto6.html')

@app.route('/registro')
def registro():
    return render_template('Registro.html')

if __name__ == '__main__':
    app.run(debug=True)