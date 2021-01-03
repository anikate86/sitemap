const express = require("express");

const SitemapGenerator = require('sitemap-generator');

const fs = require('fs');

const app = express()

const bodyparser = require('body-parser')

app.set('view engine','ejs')

app.use(bodyparser.json())


app.use(bodyparser.urlencoded({extended:false}))


app.get('/',(req,res) => {

  res.render('xmlsitemapgenerator',{title:'Generate XML Sitemap for Domain Online - XML Sitemap Generator Online - FreeMediaTools.com'})
  
  })
  
  app.post('/xmlsitemapgenerator',(req,res) => {
  
  var url = req.body.url
  
  var outputfile = Date.now() + "output.xml"
  
  const generator = SitemapGenerator(url, {
    stripQuerystring: false,
    filepath:outputfile
  });
  
  // register event listeners
  generator.on('done', () => {
  
  res.download(outputfile,(err) => {
  
  if(err){
  
  fs.unlinkSync(outputfile)
  
  res.download("unable to download the sitemap file")
  
  }
  
  fs.unlinkSync(outputfile)
  
  
  })
    
  });
  
  // start the crawler
  generator.start();
  
  
  
  })

app.listen(process.env.PORT || 5000)