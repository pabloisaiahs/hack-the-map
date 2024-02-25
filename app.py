from flask import Flask, render_template, jsonify, request
import openai

app = Flask(__name__, template_folder = 'docs')


openai.api_key = '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'



@app.route('/ask', methods=['POST'])
def ask_openai():
    data = request.json
    prompt = data['prompt']
    try:
        response = openai.completions.create(
            model="gpt-3.5-turbo",  # or whatever model you're using
            prompt = prompt,
            max_tokens = 150

        )
        return jsonify(response['choices'][0])  # Send the OpenAI API response back to the client
    except Exception as e:
        return jsonify({'error': str(e)}), 500



# root for initial website here
@app.route('/')
def index():
    return render_template('index.html')





if __name__ == '__main__':
    app.run(debug=True)








