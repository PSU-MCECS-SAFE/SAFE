# System for Anonymous Feedback (SAFE)

## Project Description
SAFE is a secure feedback platform designed to empower students to openly express their questions and comments anonymously for the computer science department chair in Portland State University.

It offers an invaluable method for students to provide honest feedback, shedding light on areas where improvement is needed and offering suggestions to enhance the support provided for their success.

Significantly, SAFE exudes a user-centric approach by relieving students from the obligation to log in or create an account, thereby guaranteeing the utmost protection of their privacy as no identifying information is stored.

## Feature
Allow students to submit anonymous feedback to the chair of the Portland State University Computer Science department. 
For more implementation details, please refer to the SAFE Technical Document.

## Configuration
   - *****The codebase in this `main` branch is deployed to the SAFE domain. Please DO NOT touch this branch until the new release version is ready.**
   - To connect to the VM, your computer's SSH key need to add to the SAFE VM, contact CAT to do it.
   - To connect to the VM, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/). 

## Compile Instruction
1. Log in `ssh feedback_web@feedback.cs.pdx.edu`, go to public_html folder
2. Clone the repository and switch to the main branch 
      - `git clone https://github.com/PSU-MCECS-SAFE/SAFE.git`
      - `git checkout main`
3. Run `npm run psu_deploy`
      - Option 1 in the menu will run automatically run if the script detects that it is missing `safeConfig.json`
      - Fill out the database login information and receiver email address.
      - Choose Option 0 when the script is done.
      - This command line will install all necessary packages for SAFE, setup, and generate files to make database connections. More details please refer to [issue#27](https://github.com/PSU-MCECS-SAFE/SAFE/issues/27#issue-1697069201)
4. Copy everything in **build** folder to **SAFEdeploy** 
      - make sure you are in root folder of feedback_web. To ensure this, do `pwd' and you should see `/u/feedback_web` as output.
      - Then do cp `-r /public_html/SAFE/build/* /SAFEdeploy/`.
      - This is because **SAFEdeploy** is the domain of feedback.cs.pdx.edu.
5. Run `pm2 list`
      - This will list out all pm2 process we have.
      - run `pm2 delete id/name` to delete all of the old pm2 process since we now need to kick start the newer version of the server.
6. Run `pm2 start node path/to/the/server.js --name anythingYouWantHere` This will have pm2 keep running your server on the back and give it a name.
7. Open SAFE website and test it out, you are all set.
      - [SAFE](https://feedback.cs.pdx.edu/)
8. to stop the server, do `pm2 stop NameOfTheServer/idOfTheProcess`


   Common errors when compiling or deploying code
      - make sure you're at HTTP instead of HTTPS 
      - make sure you're connected to VPN
      - make sure code is in public_html folder

## Documentation (Will update when its finalize)
   - SAFE Project Document
   - SAFE Technical Document

## License Information
The SAFE Project is currently licensed under the MIT license.
