# System for Anonymous Feedback (SAFE)

## Project Description

SAFE is a secure feedback platform designed to empower students to openly express their questions, comments and concerns anonymously for the computer science department chair at Portland State University.

It offers an invaluable method for students to provide honest feedback, shedding light on areas where improvement is needed and offering suggestions to enhance the support provided for their success.

Significantly, SAFE employees a user-centric approach by relieving students from the obligation to log in or create an account, thereby guaranteeing the utmost protection of their privacy as no personal identifying information is stored.

## Features

Allow students to submit anonymous feedback to the chair of the Portland State University Computer Science department.
For more implementation details, please refer to the SAFE Technical Document.

## Configuration

- **The codebase in this `main` branch is deployed to the SAFE domain. Please DO NOT touch this branch until the new release version is ready.**
- To connect to the VM, your computer's SSH key need to add to the SAFE VM, contact either the projects sponsor for the term or the CAT to complete this action.
- To connect to the VM, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/).

## Compile Instruction

1. Log in `ssh feedback_web@feedback.cs.pdx.edu`, and `cd` into the `public_html` folder

2. Clone the repository and ensure it is the `main` branch

   - `git clone https://github.com/PSU-MCECS-SAFE/SAFE.git`
   - `git checkout main`
   - `git branch` should state `main` if not, type `git checkout main`

3. Run `npm run psu_deploy` which will execute (safely) `safe_setup.py`

   - **Option 1** in the menu will run automatically run if the script detects that it is missing `safeConfig.json`
   - This option will install all necessary packages for SAFE, setup, and generate files to make database connections. More details please refer to [issue#27](https://github.com/PSU-MCECS-SAFE/SAFE/issues/27#issue-1697069201)
   - Fill out the database login information and receiver email address.
   - **Option 7** will only successfully and fully execute if it is on the VM `feedback.cs.pdx.edu`, otherwise an error pops up alerting the user of this fact. This performs a large amount of heavy lifting for deploying new builds to the PSU system.
   - Read the SAFE technical documentation on `safe_setup.py` for more information regarding this script. Only certain files need to be rebuilt sometimes so it is strongly encouraged to read this section of the documentation.

4. Execute **option 7 from the script if system is already setup**, otherwise execute option 1. It should execute automatically but if it doesn't for some reason, **you must do this before proceeding to the next step**.

5. Run `pm2 list`

   - This will list out all pm2 process we have.
   - run `pm2 delete id/name` to delete all of the old pm2 process since we now need to kick start the newer version of the server.

6. Run `pm2 start node path/to/the/server.js --name anythingYouWantHere` PM2 will keep running the REST API server (server.js) on the back and give it a name.

7. Visit the SAFE website to test and verify it is running. Then you're all set!

   - [SAFE](https://feedback.cs.pdx.edu/)

8. to stop the server, do `pm2 stop NameOfTheServer/idOfTheProcess`

## Common errors when compiling or deploying code working with public_html on `feedback.cs.pdx.edu`

- Make sure you're SAFE UI and server.ts both are using `https` in their requests handling.
- Make sure you're connected to VPN
- Make sure code is in public_html folder
- If you have **_ever_** modified your systems `hosts` file to modify and act as the host for the SAFE webpage for testing purposes, make sure you remove it before trying to connect to the website **-OR-** the VM.

## Documentation

- SAFE Project Document
- SAFE Technical Document

## License Information

The SAFE Project is currently licensed under the MIT license.
