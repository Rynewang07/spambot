from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import json
from sklearn import svm


db = dict()

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = "Content-Type"

@app.route('/data', methods=["POST"])
def example():
    email_data = request.get_json(force=True)['msg']

    emails = []

    while len(email_data) > 3:
        try:
            ind1 = email_data.index('{')
            ind2 = email_data.index('}')

            emails.append( json.loads(email_data[ind1:ind2+1]) )
            email_data = email_data[ind2+1:]
        except:
            break

    data = [
        [0],
        [1]
    ]

    s = ['flag', 'safe']

    rec_model = svm.SVC()
    rec_model.fit(data, s)

    flagged = []
    for email in emails:
        values = [getNum(email)]
        print(values)
        process = rec_model.predict([values])
        if process[0] == 'flag':
            flagged.append(email['email'])


    # link_safety = rec_model.predict([[5,2,5,2,5]])
    # data.append([5,2,5,2,5])
    # s.append(link_safety[0])
    
    return json.dumps(flagged)

def getNum(email):
    if "game" in email['subject']:
        return 0
    if "blizzard" in email['sender']:
        return 0
    if "nintendo" in email['sender']:
        return 0
    if "Ubisoft" in email['sender']:
        return 0
    if "ea" in email['sender']:
        return 0
    if "rockstargames" in email['sender']:
        return 0
    if "mojang" in email['sender']:
        return 0
    if "epicgames" in email['sender']:
        return 0
    if "bethsoft" in email['sender']:
        return 0
    return 1

app.run(host="127.0.0.1")