function redirectionLogin(){
  document.getElementById("fond-curvy").animate([
      // étapes/keyframes
      { transform: 'translateY(0px)' },
      { transform: 'translateY(-384.8px)' }
      
    ], {
      // temporisation
      duration: 500,
      fill: 'forwards'
    });

  document.getElementById("fond-back").animate([
    // étapes/keyframes
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-327.83px)' }
    
  ], {
    // temporisation
    duration: 500,
    fill: 'forwards'
  });

  document.getElementById("fond-front").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-107px)' }
    
  ], {
    // temporisation
    duration: 500,
    fill: 'forwards'
  });

  document.getElementById("fond-front").animate([
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-107px)' }
    
  ], {
    // temporisation
    duration: 500,
    fill: 'forwards'
  });

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
    // temporisation
    duration: 500,
    fill: 'forwards'
  });

  setTimeout(function(){
    window.location.href = '/login';
  }, 500);


  };
  
  function redirectionAccueil(){
    document.getElementById("fond-curvy").animate([
        // étapes/keyframes
        { transform: 'translateY(0px)' },
        { transform: 'translateY(+385px)' }
        
      ], {
        // temporisation
        duration: 500,
        fill: 'forwards'
      });
  
    document.getElementById("fond-back").animate([
      // étapes/keyframes
      { transform: 'translateY(0px)' },
      { transform: 'translateY(+327.83px)' }
      
    ], {
      // temporisation
      duration: 500,
      fill: 'forwards'
    });
  
    document.getElementById("fond-front").animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(+107px)' }
      
    ], {
      // temporisation
      duration: 500,
      fill: 'forwards'
    });
  
    document.getElementById("fond-front").animate([
      { transform: 'translateY(0px)' },
      { transform: 'translateY(+107px)' }
      
    ], {
      // temporisation
      duration: 500,
      fill: 'forwards'
    });
  
    document.getElementById('login-block').style.transition = 'opacity 1s ease-in-out';
    document.getElementById('login-block').style.opacity = 0; 
  
  
    document.getElementById("h1").style.position = 'absolute';
    document.getElementById("h1").style.left = '449.3935px';
    document.getElementById("h1").style.top = '0px';
        
    document.getElementById("h1").animate([
      { transform: 'translateY(0px) translateX(0px)' },
      { transform: 'translateY(+123px) translateX(0px)' },
      
    ], {
      // temporisation
      duration: 500,
      fill: 'forwards'
    });
  
    setTimeout(function(){
      window.location.href = '/index';
    }, 500);

  };
    
function redirectionPage(){
    window.location.href = '/user';
}
