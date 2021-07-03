# Cryptocurrency-Chan [ Discord BOT ]
### This bot show you prices of cryptocurrencies, And also you can add price Trigger .

#### Setup :
   - Create Discord Token , [Doc](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token)
   - Create New Repo & Add a json file with empty array 
   - Go to the `te.js` file & Follow the commands [Notice : These Steps apply on CheckerSender & Cryptocurrency-kun]
   - Go to [Nomics](https://p.nomics.com/pricing#free-plan) website & generate new API key
   - Go to the `index.js` file & set the token in `ApiKey` var ,  Follow the commands [Notice : These Steps apply on CheckerSender & Cryptocurrency-kun]
   - Remove the `express` pkg, import, function if your not using [Heroku](https://heroku.com/)

#### Description
```
This bot can show you prices of cryptocurrencies ,
Available Cryptocurrencies in this time just this : BTC,ETH,XRP,DOGE . 
and in the future maybe will add more ..,
And also you can add price Trigger 'reminder' ,
I Mean you can set some price for some cryptocurrency and 
until the cryptocurrency real price equal to your inserted price 
will send DM to you 'Max Triggers : 1'.
```
#### Commands :
##### Show a Cryptocurrency info :
   - Like if you want to show the bitcoin info type : !btc
##### Set Trigger:
   ###### If you want to set the bitcoin trigger : 
    - !btc 'YourPrice Here (Int)'
    - like : !btc 33000
##### Remove Trigger :
    - just type : !un
##### Show Trigger Info :
    - Type : !show
##### More Commands :
    - !info  : Show all BOT Commands
    - !sheeh : donate to me
    - !hmm   : About The Creator of BOT
