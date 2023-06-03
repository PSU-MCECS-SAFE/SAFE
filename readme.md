# System for Anonymous Feedback (SAFE)

## Project Description
SAFE is a secure feedback platform designed to empower students to openly express their questions, comments and concerns anonymously for the computer science department chair at Portland State University.

It offers an invaluable method for students to provide honest feedback, shedding light on areas where improvement is needed and offering suggestions to enhance the support provided for their success.

Significantly, SAFE employees a user-centric approach by relieving students from the obligation to log in or create an account, thereby guaranteeing the utmost protection of their privacy as no personal identifying information is stored.

## Features
Allow students to submit anonymous feedback to the chair of the Portland State University Computer Science department. 
For more implementation details, please refer to the SAFE Technical Document.

## Configuration
   - **This `MVP` branch is for a snapshot of the delivered project.** It is a 
      fully functioning version of the SAFE project based on the requirements
      for the **Spring '23** capstone team. Updates were made, fixes were
      preformed however this is a guaranteed 100% functional version of the
      final product.
   - To connect to the database and test the backend code, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/). 

## Compile Instruction
1. Log in your `ssh username@rita.cecs.pdx.edu` in PSU Linux system, go to public_html folder
      - Why do we need to use use `rita` not `ada` or `ruby`? - We use the `rita` IP address to fetch requests for student developers to test the website on their PSU personal websites. Alternatively, you can use `ada`, but you'll need the corresponding IP address. Unfortunately, `ruby` doesn't have an available IP address for student use.
      - Why do we need to use public_html not dev_html? - We need to use HTTP instead of HTTPS because the dev_html URL will always auto-correct to HTTPS.


2. Clone the repository and switch to the `MVP` branch 
      - `git clone https://github.com/PSU-MCECS-SAFE/SAFE.git` 
      - `git checkout MVP`


3. Run `npm run psu_deploy`
      - **Option 1** in the menu will run automatically run if the script detects that it is missing `safeConfig.json`
        - This option will install all necessary packages for SAFE, setup, and generate files to make database connections. More details please refer to [issue#27](https://github.com/PSU-MCECS-SAFE/SAFE/issues/27#issue-1697069201)
      - Fill out the database login information and receiver email address.
      - **Option 7** will only successfully and fully execute if it is on the VM `feedback.cs.pdx.edu`, otherwise an error pops up alerting the user of this fact.
      - Read the SAFE technical documentation for more information regarding the script.

4. Run `node JSoutFile/safeMessageDB/server.js`
      - This command line will start the REST server, allowing the server to listen to the assigned IP and perform POST and GET requests to and from the database.


5. Open your PSU personal website of build folder and **you're in SAFE now!**
      - https://web.cecs.pdx.edu/~username/SAFE/build
      - [CAT's explainer on how to setup your PSU web page](https://cat.pdx.edu/services/web/account-websites/) and the permissions required to make the site visible.
        - Note: The python script will set these permissions correctly when build is ran. 


## Common errors when compiling or deploying code working with public_html on `rita`
- make sure you're at HTTP instead of HTTPS (http:// vs https://)
- make sure you're connected to VPN
- make sure code is in public_html folder

## Documentation (Will update when its finalize)
- SAFE Project Document
- SAFE Technical Document

## License Information
The SAFE Project is currently licensed under the MIT license.