var casper = require('casper').create({
    verbose: false,
    logLevel: 'debug',
    clientScripts: ["vendor/jquery.min.js", "vendor/lodash.js"]
  });
  casper.options.waitTimeout = 1000;
  var fs = require('fs');
  var system = require('system');
  
  var links = [];
  var pwd=fs.workingDirectory;
  var screenshotsDir=pwd+"/screenshots/"

  function getELementsAttributeByTagName(selector,attribute){
      var ele=$(selector);
      return _.map(ele, function(e) {
        return e.getAttribute(attribute);
      });
  }
  
  casper.start('https://demo.mahara.org/', function() {
    this.echo(this.getTitle());
    this.echo(this.evaluate(getELementsAttributeByTagName,"a","href"));
    this.fill('form#login', {
      login_username: 'admin',
      login_password:'MaharaDemo'
    }, true);
  });

  casper.then(function(){
     this.waitForSelector('.user-icon',function(){
      this.capture(screenshotsDir+'Loggedin.png')
     });
  })
    
  casper.run()