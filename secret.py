from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Constants for the field dimensions
FIELD_WIDTH = 800
FIELD_HEIGHT = 600

# Initial positions
ball_x = FIELD_WIDTH // 2
ball_y = FIELD_HEIGHT // 2

ai_x = FIELD_WIDTH // 4
ai_y = FIELD_HEIGHT // 2

# Function to calculate reward and punishment based on action
def calculate_reward_punishment(action):
    reward = 0
    punishment = 0
    
    if action == 'dribble':
        reward += 10
    elif action == 'shoot':
        reward += 20
    else:
        punishment += 5
    
    return reward, punishment

# Route for rendering the HTML template
@app.route('/')
def index():
    return render_template('index.html', field_width=FIELD_WIDTH, field_height=FIELD_HEIGHT, ball_x=ball_x, ball_y=ball_y, ai_x=ai_x, ai_y=ai_y)

# Route to handle AI movement and interaction
@app.route('/move_ai', methods=['POST'])
def move_ai():
    action = request.json['action']
    
    # Example basic logic for AI movement
    if action == 'dribble':
        ai_x += 10  # Example movement towards the ball
    elif action == 'shoot':
        # Implement shooting logic if needed
        pass
    
    # Calculate reward and punishment
    reward, punishment = calculate_reward_punishment(action)
    
    # Example response
    response = {
        'reward': reward,
        'punishment': punishment,
        'ai_x': ai_x,
        'ai_y': ai_y,
        'ball_x': ball_x,
        'ball_y': ball_y
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)





