import random
import json
import pickle
import numpy as np
import nltk
from nltk.stem import WordNetLemmatizer
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout
from keras.optimizers import SGD
from keras.optimizers import schedules

nltk.download('punkt')
nltk.download('wordnet')



# Instantiate WordNetLemmatizer
lemmatizer = WordNetLemmatizer()

intents = json.loads(open('intents.json').read())

words = []
classes = []
documents = []
ignore_letters = ['?', '!', '.', ',']

for intent in intents['intents']:
    for pattern in intent['patterns']:
        words_list = nltk.word_tokenize(pattern)
        words.extend([lemmatizer.lemmatize(word.lower()) for word in words_list if word not in ignore_letters])
        documents.append((words_list, intent['tag']))
        if intent['tag'] not in classes:
            classes.append(intent['tag'])

words = [lemmatizer.lemmatize(word) for word in words if word not in ignore_letters]
words = sorted(set(words))
classes = sorted(set(classes))

pickle.dump(words, open('word.pkl', 'wb'))
pickle.dump(classes, open('classes.pkl', 'wb'))

training = []
output_empty = [0] * len(classes)

for document in documents:
    bag = []
    word_patterns = document[0]
    word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
    for word in words:
        bag.append(1) if word in word_patterns else bag.append(0)

    output_row = list(output_empty)
    output_row[classes.index(document[1])] = 1
    training.append([bag, output_row])

# Pad sequences to ensure consistent length
max_len = max(len(seq) for seq, _ in training)
padded_sequences = [np.pad(seq, (0, max_len - len(seq)), 'constant') for seq, _ in training]
training = np.array(list(zip(padded_sequences, [output for _, output in training])), dtype=object)

# Shuffle the training data
random.shuffle(training)

train_x = np.array(list(training[:, 0]))
train_y = np.array(list(training[:, 1]))

model = Sequential()
model.add(Dense(256, input_shape=(max_len,), activation='relu'))
model.add(Dropout(0.4))
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.4))
model.add(Dense(len(classes), activation='softmax'))

lr_schedule = schedules.ExponentialDecay(initial_learning_rate=0.001, decay_steps=10000, decay_rate=0.9)
sgd = SGD(learning_rate=lr_schedule, momentum=0.9, nesterov=True)

model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])

model.fit(train_x, train_y, epochs=300, batch_size=10, verbose=1)
model.save('chatbotmodel.h5')
print("Done")
