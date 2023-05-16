# System for Anonymous Feedback (SAFE)

## Project Description: 
          SAFE is a secure feedback platform designed to empower students to
          openly express their questions and comments anonymously for the
          computer science department chair in Portland State University.

          It offers an invaluable method for students to provide honest
          feedback, shedding light on areas where improvement is needed and
          offering suggestions to enhance the support provided for their
          success.

          Significantly, SAFE exudes a user-centric approach by relieving
          students from the obligation to log in or create an account, thereby
          guaranteeing the utmost protection of their privacy as no identifying
          information is stored.

## Configuration:
   - To connect to the database and test the backend code, you will need to establish a [VPN connection to PSU network](https://cat.pdx.edu/services/network/vpn-services/). 

## Compile Instruction: 
    1. Log in your `ssh username@rita.cecs.pdx.edu` PSU Linux system, go public_html folder
       - *** reason why we use rita not ada or something else? ***
       - *** reason why we try to deploy code in public_html not web_deb? ***
    2. Clone the repository and `git checkout` to MVP branch 
    3. Run `npm run psu_deploy`, choose option 1 in the menu, and fill out the database login information. 
       - *** what is this command line? what it will do? brief describe and refer to issue that Alex wrote ***
       - Hit Option 0 when the script is done.
    4. Run `node JSoutFile/safeMessageDB/server.js`
       - *** explain what is this and what this will do? ***
       
    Common error when compiling or deploying code
      - 
      - 

## License Information:
          The SAFE Project is currently licensed under the MIT license.
