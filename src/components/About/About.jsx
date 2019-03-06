import React from 'react';
import PropType from 'prop-types';

// styles
import './About.scss';

const About = ({ clearSpecialViews, checkout }) => (
    <div className="about">
        <p className="return" onClick={clearSpecialViews}>
            <i className="fas fa-arrow-left"></i> Back to the main page
        </p>
        <p>Welcome to this year’s edition of the Express-News “Top 100 Dining & Drinks” guide — our fifth annual issue where we give you the Top 100 restaurants, bars, bakeries, distilleries, breweries, wineries and coffee shops in the San Antonio area.</p>
        <p>We rank the Top 10 restaurants and alphabetize the list of the next 50 best restaurants. For the rest of the categories, we proclaim the best and alphabetize the rest of the best.</p>
        <p>And we always wish that we had just a few more spots in each category.</p>
        <p>Subscribers get exclusive access to our “Top 100 Dining & Drinks” guide on our premium website at <a href="https://expressnews.com/top100" target="_blank">ExpressNews.com/Top100</a>. Here you can search our Top 100 listings by cuisine type, price, part of town and more. This is a must-have for area foodies, so if you are a print subscriber (even just one day a week) and you still have not activated your free <a href={checkout} target="_blank">ExpressNews.com account</a>, or you haven’t bought a digital-only subscription, you’re missing out on this and so much more of our award-winning Express-News journalism — including all of our recipes, how-to cooking videos and full restaurant reviews.</p>
        <p>And if you would like a copy of the printed “Top 100 Dining & Drinks” book to keep at home or for gifts, head to <a href="https://san-antonio-express-news.myshopify.com/collections/frontpage/products/2019-top-100-book" target="_blank">mySA.com/shop</a>.</p>
        <p>¡Buen provecho!</p>
    </div>
);

About.propTypes = {
    clearSpecialViews: PropType.func.isRequired,
    checkout: PropType.string.isRequired,
};

export default About
