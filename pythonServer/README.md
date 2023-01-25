# Tutorial on how to write backend python functions locally and upload them to Google Cloud

Your account should already be assigned with the correct IAM permissions. If you run into any IAM permissions
issues, contact Harris.

If you are curious about any other Google Cloud configuration, play around with the menu 
in [Cloud Console](https://console.cloud.google.com/)!

# Team Conventions
Members of the Edeno Project will use snake notation for communication

## 1. Configure your Google Cloud Connection
Install the gcloud CLI [here](https://cloud.google.com/sdk/docs/install)

First, run
```bash
gcloud init
```
You can run this command in any directory.

You may also want to run
```bash
gcloud components update
```
to ensure your google cloud CLI is up to date

After running the command, follow command line instructions to configure your machine.
Make sure to connect to Edeno project (edeno-b66fc)!

## 2. Set up your Python Environment
Then, [Setup a virtual environment](https://docs.python.org/3/tutorial/venv.html) **in THIS DIRECTORY /edeno/server**

Activate your virtual environment using the activateSource script, which reads an argument that is your virtual env folder
```bash
source activateSource virtualEnv
```

Install required python dependencies
Run 
```bash
pip install -r requirements.txt
```

Deactivate the environment whenever you are not working on the Edeno project
```bash
deactivate
```

## 3. Deploy your functions
Quick Tutorial on Deployment: https://cloud.google.com/functions/docs/tutorials/http#deploying_the_function
More in depth detail on Deployment: https://cloud.google.com/functions/docs/deploy

General rule of thumb (according to Harris' Beliefs) is to use 2nd gen Functions for typical backend endpoints, 
and 1st gen Function for Firebase triggers (ex. I write to the Firebase Realtime Database and I want to 
do some Data Cleaning. I should use a 1st gen Function to do that)


# Local Testing

Run [functions-framework](https://cloud.google.com/functions/docs/running/function-frameworks) command. Inclde the target you will run, and the signature type.

The below command can be run in the /edeno/server directory. It runs hello_get function from the main.py file in ./python-docs-samples/functions/helloworld
```bash
functions-framework --target=hello_get --signature-type=http --source=./helloworld/main.py
```