# tornac1234.github.io

# Savefile Upgrader Hotfix

This is just some tool to fix the ``Could not load world, creating a new one : System.ArgumentException An item with the same key has already been added.``  
But it's temporary as this will officially be in next release (current one when of writing this is 1.6.0.0)

The steps are simple:  

0. Make sure your server is stopped
1. Find your "WorldData.json" file after it's upgraded to 1.6.0.0
  	- Because there's the error I mentionned above, a new and empty "WorldData.json" file will be created, **THIS IS IS NOT THE ONE YOU WANT**
  	- The upgraded file will be moved to the "worldBackup.zip" which is inside your world folder **THIS IS THE ONE WE'RE LOOKING FOR**
2. Get all the text from this file
  	- You can open with any editor and press ``Ctrl + A`` then ``Ctrl + C`` to copy all the text inside  
3. Open the website (link above) and paste the text in the **FIRST** text area
4. Press the submit button (there's only one in the page)
5. If you get a success message, it means you can copy the text that appeared in the **SECOND** text area
![image](https://user-images.githubusercontent.com/24827220/156413436-bb77c413-3cc5-4e37-aead-d4ec28a8ba7f.png)
  	- If you get an error message, make sure you copied **ALL** the text and that you got a valid file
6. Remove any text from your "WorldData.json" (the one that's inside the "world" folder this time), then paste the text you got from step 5 in it.
  	- Don't forget to save the file afterwards
7. When you start again the server, the error should be gone

# Get Default Savefiles
This lets you download the default savefiles so that you can replace one if it's causing an issue

# Get Your External Ip
This is almost a joke but you can get your IP there

# Remove Red Pieces
Same steps as for Savefile Upgrader Hotfix but you'll be looking for "BaseData.json" instead of "WorldData.json"

# Aurora Explosion Calculator
Same steps as for Savefile Upgrader Hotfix but you'll simply need to precise the amount of time you want before aurora's explosion.
