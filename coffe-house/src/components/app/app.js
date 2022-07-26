import { Component } from 'react';

import Navigation from '../nav/nav';
import OurCoffeHeader from '../header-our-coffe/header-our-coffe';
import MainHeader from "../main-header/main-header";
import YourPleasure from '../your-pleasure/your-pleasure';
import MainPage from '../main-page/main-page';
import AboutBeans from "../about-beans/about-beans";
import MainaboutUsCards from "../main-about-us-cards/main-about-us-cards";
import SearchPanel from '../search/search';
import AppFilter from '../filter/filter';


import './app.css';


const logo = require('../main-about-us/Beans logo.png');
const logoBeansW = require('./img/Group-8.png');
const logoBeansB = require('./img/Group.png');

const imgGirl = require('./img/girl.jpg');
const headerText = 'About our beans';
const imgCoffe = require('./img/coffee.png');
const headerText1 = 'About our goods';
const imgCoffeAbout = require('./img/arom.jpg');
const headerText2 = 'About it';

const cardImage = require('../main-page/img/card3.png');
const classes = 'card-body secondary';
const aligns = 'left'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Brasil', prise: '6.99$', id:1},
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Kenya', prise: '6.99$', id:2},
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Columbia', prise: '6.99$', id:3},
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Brasil', prise: '6.99$', id:4},
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Brasil', prise: '6.99$', id:5},
                {url: cardImage, header: 'AROMISTICO Coffee 1 kg', country:'Brasil', prise: '6.99$', id:6}
            ],
            term: '',
            filter: '',
            renderHeader : 'main'

        }
    }
    onPageSelect = (renderHeader) => {
        this.setState({renderHeader});        
    }
    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.country.indexOf(term) > -1
        })
    }
    onUpdateSearch = term => {
        this.setState({term})
    }
    filterCards = (items, filter) => {
        switch (filter) {
            case 'brasil': 
                return items.filter(item => item.country === 'Brasil');
            case 'kenya':
                return items.filter(item => item.country === 'Kenya');
            case 'columbia':
                return items.filter(item => item.country === 'Columbia');
            default:
                return items;
        }
    }
    onFilterSelect = (filter) => {
        console.log(filter)
        this.setState({filter})
    }

    render () {
        const {data, term, filter} = this.state;
        const newData= this.filterCards(this.search(data, term), filter);
        let headerPagePart;
        let headerClassName;
        let mainPagePart;
        if (this.state.renderHeader === 'main') {
            headerPagePart = <MainHeader onPageSelect = {this.onPageSelect}/>      
            headerClassName ='main-page';                                      
            mainPagePart = <MainPage onPageSelect = {this.onPageSelect}/>
        } else if (this.state.renderHeader === 'coffe') {
            headerPagePart = <OurCoffeHeader /> 
            headerClassName ='other-page';                       
            mainPagePart = 
                <main>
                    <div>
                        < AboutBeans image = {imgGirl} 
                            headerText = {headerText}/>
                        <div>
                            <div className='controls'>
                                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                                <AppFilter onFilterSelect={this.onFilterSelect}/>
                            </div>
                            < MainaboutUsCards data={newData}
                                classes={classes}
                                aligns={aligns}
                                onPageSelect = {this.onPageSelect}/>
                        </div>
                    </div>
                </main>
        }  else if (this.state.renderHeader === 'pleasure') {
            headerPagePart =  <YourPleasure />;
            headerClassName ='other-page';   
            mainPagePart =            
                    <main>
                        <div>
                            < AboutBeans image = {imgCoffe}
                                headerText = {headerText1} 
                                />
                            <div>
                                < MainaboutUsCards data={this.state.data}
                                classes={classes}
                                aligns={aligns}
                                onPageSelect = {this.onPageSelect}/>
                            </div>
                        </div>    
                    </main>
                    
        }  else if (this.state.renderHeader === 'about') {
            headerPagePart =  <OurCoffeHeader />;                                       
            headerClassName ='other-page';                 
            mainPagePart = 
                        <main>
                            <div>
                                < AboutBeans image = {imgCoffeAbout} 
                                    headerText = {headerText2}
                                    />
                            </div>
                        </main>
        }
            return (
                <div className='App'>
                    <header className={headerClassName}>
                                    <Navigation logo={logoBeansW}
                                    onPageSelect = {this.onPageSelect} /> 
                                    {headerPagePart}                                     
                    </header>;  

                    {mainPagePart}

                    <footer>
                        <Navigation logo = {logoBeansB}
                        onPageSelect = {this.onPageSelect}
                        />
                    <img  src={logo} alt='logo'></img>
                </footer >
                </div>
            )
        
        
    }
}

export default App;