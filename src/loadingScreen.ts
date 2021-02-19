import { DefaultLoadingScreen } from "@babylonjs/core/Loading/loadingScreen";

DefaultLoadingScreen.prototype.displayLoadingUI = function () {
    var elemRoot = document.getElementById("holder");
    if (elemRoot)
    {
      elemRoot.style.display = "none";
    }
    // var elemInstructions = document.getElementById("instructions");
    // if (elemInstructions)
    // {
    //   elemInstructions.style.display = "none";
    // }
  
    var elementID = document.getElementById("customLoadingScreenDiv1");
    if (elementID) {
      elementID.style.display = "block";
        // Do not add a loading screen if there is already one
        return;
    }
    
    const loadingDiv = document.createElement("div");
    loadingDiv.id = "customLoadingScreenDiv1";
    loadingDiv.innerHTML = '<img src=https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Loadingsome.gif/600px-Loadingsome.gif />'    
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv1{
        text-align:center;      
    }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
  
    // this._resizeLoadingUI();
    // window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(loadingDiv);
  };
  
  DefaultLoadingScreen.prototype.hideLoadingUI = function(){
    var elem = document.getElementById("customLoadingScreenDiv1");
    if (elem)
    {
      elem.style.display = "none";
      console.log("scene is now loaded");
    }
    var elemRoot = document.getElementById("holder");
    if (elemRoot)
    {
      elemRoot.style.display = "initial";
    }
    // var elemInstru = document.getElementById("instructions");
    // if (elemInstru)
    // {
    //   elemInstru.style.display = "initial";
    // }
  }
  