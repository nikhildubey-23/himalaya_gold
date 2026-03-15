from flask import Flask, render_template, send_from_directory

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/robots.txt')
def robots_txt():
    return send_from_directory(app.root_path, 'robots.txt')

@app.route('/sitemap.xml')
def sitemap_xml():
    return send_from_directory(app.root_path, 'sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True)
