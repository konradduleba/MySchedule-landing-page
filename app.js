window.onbeforeunload = function () {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 500);
};

const loaderStyles = document.querySelector('.loader').style;
const wrapperStyles = document.querySelector('.wrapper').style;
const logoDot = document.querySelector('.dot');
const hamburger = document.querySelector('.burger');
const navigation = document.querySelector('.navigation');
const navigationContainer = document.querySelector('.navigation-container');
const navigationPhotos = document.querySelector('.nav-photos');
const welcomeLeftSide = document.querySelector('.welcome-container .left-side');
const welcomeRightSide = document.querySelector('.welcome-container .right-side');
const testLeftSide = document.querySelector('.test-container .left-side .bottom');
const testRightSide = document.querySelector('.test-container .right-side .bottom');
const mainContainer = document.querySelector('.main-container');
const optionsMotto = document.querySelector('.options-container .motto');
const optionsContainer = document.querySelector('.options-container .options .options-cont');

const mobileMenuBurger = document.querySelector('.mobile-menu .app-burger');

let menuMobileAnimation = gsap.to(navigation, {
    x: '0',
    duration: 0.7,
}).pause()

showMenuMobile = () => {
    if (mobileMenuBurger.innerHTML == "Menu") {
        menuMobileAnimation.play();
        mobileMenuBurger.innerHTML = "Close"
        document.body.style.overflowY = "hidden"
    }
    else {
        menuMobileAnimation.reverse();
        mobileMenuBurger.innerHTML = "Menu"
        document.body.style.overflowY = "auto"
    }
}

mobileMenuBurger.addEventListener('click', showMenuMobile);

if (document.body.offsetWidth > 1025) {
    gsap.registerPlugin(ScrollTrigger);

    const uppertxt = gsap.from('.upper-txt', { duration: .5, y: 100, delay: 1 }, "text");
    const lowertxt = gsap.from('.lower-txt', { duration: .5, y: -100, delay: 1 }, "text");

    let ownerText = gsap.timeline({ yoyo: true });
    ownerText.to('.owner', { duration: 2, text: "Schedule App name", delay: .1 }).pause();

    let animateLogoDot = gsap.to(logoDot, {
        scale: 1,
        x: '-45vw',
        y: '-45vh',
        duration: 0.7,
        ease: "power1.in",
        delay: 3,
        start: () => {
            uppertxt.reverse();
            lowertxt.reverse();
        },
        end: () => {
            wrapperStyles.display = "flex";
            hamburger.style.color = "black";
            loaderStyles.backgroundColor = "transparent";
        },
        onComplete: () => {
            loaderStyles.zIndex = "0";
            ownerText.play();
            document.querySelector('body').style.overflowY = "auto";
        }
    });

    gsap.to(logoDot, {
        scale: 80,
        duration: 1,
        delay: 1,
        start: () => {
            uppertxt.play();
            lowertxt.play();
        },
        onComplete: () => animateLogoDot.play()
    })

    const toggleOwnerText = () => ownerText.reversed() ? ownerText.play() : ownerText.reverse();


    logoDot.addEventListener('click', toggleOwnerText);

    gsap.to(testLeftSide, {
        scrollTrigger: {
            trigger: testLeftSide,
            start: "top bottom",
            end: "top top",
            // markers: true,
            // markers: true,
            // toggleActions: "restart pause reverse pause",
            scrub: 1,
        },
        backgroundColor: 'orange',
        duration: 3
    });

    gsap.to(testRightSide, {
        scrollTrigger: {
            trigger: testRightSide,
            start: "top bottom",
            end: "top top",
            // markers: true,
            // toggleActions: "restart pause reverse pause",
            scrub: 1,
        },
        backgroundColor: "orange",
        duration: 3
    });

    gsap.from(optionsMotto, {
        scrollTrigger: {
            trigger: testRightSide,
            start: "-100px top",
            end: "center top",
            // markers: true,
            // toggleActions: "restart pause reverse pause",
            scrub: 1,
        },
        // backgroundColor: "orange",
        x: "-100%",
        duration: 3
    });

    gsap.from(optionsContainer, {
        scrollTrigger: {
            trigger: testRightSide,
            start: "center top",
            end: "bottom top",
            // markers: true,
            // toggleActions: "restart pause reverse pause",
            scrub: 1,
        },
        // backgroundColor: "orange",
        y: "-100%",
        duration: 3
    });

    gsap.from(welcomeLeftSide, {
        duration: .7,
        x: "-200%",
        ease: "power1.in",
        delay: 3
    })

    gsap.from(welcomeRightSide, {
        duration: .7,
        x: "200%",
        ease: "power1.in",
        delay: 3
    })

    let menuPanel = gsap.to(navigation, {
        scale: 1,
        x: '100%',
        duration: 0.7,
        ease: "power1.in",
    }).pause();

    let menuPhotos = gsap.to(navigationPhotos, {
        scale: 1,
        x: '-100%',
        duration: 0.7,
        ease: "power1.in",
    }).pause();

    showMenu = () => {
        if (hamburger.innerHTML == "Menu") {
            menuPanel.play();
            menuPhotos.play();
            navigationContainer.style.zIndex = "5";
            hamburger.innerHTML = "Close";
            setTimeout(() => {
                document.querySelector('body').style.overflowY = "hidden";
            }, 500);
        }
        else {
            menuPanel.reverse();
            menuPhotos.reverse();
            hamburger.innerHTML = "Menu";
            setTimeout(() => {
                navigationContainer.style.zIndex = "0";
            }, 700);
            setTimeout(() => {
                document.querySelector('body').style.overflowY = "auto";
            }, 200);
        }
    };

    hamburger.addEventListener('click', showMenu)

    const navigationList = document.querySelectorAll('.navigation ul li');
    // const menuPhoto = document.querySelector('.nav-photos .photo');
    const menuPhotoContainer = document.querySelector('.nav-photos .photos-container');

    // const menuPhotos = [];
    console.log(navigationList);


    navigationList.forEach(element => element.addEventListener('mouseover', () => {
        gsap.to(menuPhotoContainer, {
            y: `-${element.dataset.indexNumber}00vh`,
            duration: 0.7,
        })
    }))
}
else {
    document.body.style.overflowY = "auto";
}
