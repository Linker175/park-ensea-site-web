function redirectTo(route,timer){
  setTimeout(function(){
    window.location.href = route;
  }, timer);
};

//animate only if screen width is above 1000px
function redirectionLogin(){
  if(!window.matchMedia('(max-width: 1000px)').matches){
    animateToLogin();
    timer=500;
  }
  else{
    timer=0;
  }
  redirectTo('/login',timer);
};

//animate only if screen width is above 1000px
function redirectionAccueil(){
  if(!window.matchMedia('(max-width: 1000px)').matches){
    animateToAccueil();
    timer=500;
  }
  else{
    timer=0;
  }
  redirectTo('/index',500);
};

function redirectionPage(){
  redirectTo('/user',0);
};

  
/*** ANIMATION FUNCTIONS ONLY UNDER HERE ***/

function animateToLogin(){
  /* svg */
  document.getElementById("fond-curvy").animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-384.8px)' }
    ], {

      duration: 500,
      fill: 'forwards'
    });

  document.getElementById("fond-back").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-327.83px)' }
  ], {
    duration: 500,
    fill: 'forwards'
  });

  document.getElementById("fond-front").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-107px)' }
  ], {
    duration: 500,
    fill: 'forwards'
  });

  /* rest of elements */
  document.getElementById("accueil").style.background = 0;

  document.getElementById('login-block').style.transition = 'opacity 1s ease-in-out';
  document.getElementById('login-block').style.opacity = 0.7;

  document.getElementById("h1").style.position = 'absolute';
  document.getElementById("h1").style.left = '449.3935px';
  document.getElementById("h1").style.top = '122px';
  
  document.getElementById("go-down-button").style.opacity = 0;
  
  document.getElementById("h1").animate([
    { transform: 'translateY(0px) translateX(0px)' },
    { transform: 'translateY(-123px) translateX(0px)' },
  ], {
    duration: 500,
    fill: 'forwards'
  });
};

function animateToAccueil(){
  /* svg */
  document.getElementById("fond-curvy").animate([
        { transform: 'translateY(0px)' },
        { transform: 'translateY(+385px)' }
      ], {
        duration: 500,
        fill: 'forwards'
      });
  
  document.getElementById("fond-back").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(+327.83px)' } 
  ], {
    duration: 500,
    fill: 'forwards'
  });

  document.getElementById("fond-front").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(+107px)' }
  ], {
    duration: 500,
    fill: 'forwards'
  });

  document.getElementById("fond-front").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(+107px)' }
  ], {
    duration: 500,
    fill: 'forwards'
  });

  /* rest of elements */
  document.getElementById('login-block').style.transition = 'opacity 1s ease-in-out';
  document.getElementById('login-block').style.opacity = 0; 

  document.getElementById("h1").style.position = 'absolute';
  document.getElementById("h1").style.left = '449.3935px';
  document.getElementById("h1").style.top = '0px';
      
  document.getElementById("h1").animate([
    { transform: 'translateY(0px) translateX(0px)' },
    { transform: 'translateY(+123px) translateX(0px)' },
  ], {
    duration: 500,
    fill: 'forwards'
  });
};

function scrollDownOnClick() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
  });
}

document.getElementById(go-up-button).style.position = 'fixed';

function scrollUpOnClick() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}