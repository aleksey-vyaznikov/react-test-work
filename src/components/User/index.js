import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import ReactDOM from 'react-dom';
import { CSSTransitionGroup } from 'react-transition-group'
import GSAP from 'react-gsap-enhancer';
import { TweenMax } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { pluralize } from 'utils/helpers'
import classNames from 'classnames';
import Star from 'components/Star' 
import styles from './styles.styl';
import text from 'config/text.json';
var controller = new ScrollMagic.Controller();


function appearAnim(utils) {
	return timeline
		.fromTo(utils.target, 0.35, {
			opacity: 0.001,
			y:20,
		}, {
			opacity: 1,
			y:0,
			ease: Power2.easeOut,
			onComplete: utils.options.callback,
		}, utils.options.num*0.2 )
}

function leaveAnim(utils) {
	return new TimelineMax()
		.to(utils.target, 0.25, {
			height: 0	,
			opacity:0,
			ease: Power1.easeIn,
			onComplete: utils.options.callback,
		})
}



class User extends Component {
	constructor(props) {
		super(props)
		this.show = this.show.bind(this);
	}
	show() {
		let { user, header, inner } = this.refs;
		TweenMax.to(user, 0.35, {
			opacity:1,
			y:0,
			ease: Power2.easeOut
		})
		if (this.props.view == 'preview') {
			TweenMax.to(header, 0.35,{
						opacity:1,
						y:0,
						ease: Power2.easeOut
					}).delay(0.2)
			TweenMax.to(inner, 0.35, {
						opacity:1,
						y:0,
						ease: Power2.easeOut
					}).delay(0.3)
			}
	}

	componentDidUpdate(props) {
		// if (this.props.view == 'table') {
		// 	console.log('1');
		// }
		TweenMax.set(this.refs.user, {
			y: 40,
			opacity: 0
		});
		this.scene.destroy();
		this.scene = new ScrollMagic.Scene({triggerElement: this.refs.user, triggerHook: 1})
			.on("enter", (e) => {
				this.show()
			})
			.addTo(controller);
	}
	componentDidMount() {
		this.scene = new ScrollMagic.Scene({triggerElement: this.refs.user, triggerHook: 1})
		this.scene.on("enter", (e) => {
				this.show()
			})
			.addTo(controller);
	}
	componentWillUnmount() {
		this.scene.destroy();
	}
	videoPlay() {
		if (this.props.video) {this.refs.video.play()}
	}
	videoPause() {
		if (this.props.video) {this.refs.video.pause()}
	}
	render() {

		let { id, name, image, age, phone, phrase, video, view, lang, favourite, toogleStar } = this.props;
		let itemStyle = classNames({
			'User': true,
			'User_isvideo': video && view=='preview',
			'User_preview': view=='preview'
		});
		let contentStyle = classNames({
			'User__content': true,
			'User__content_isvideo': video
		});
		let starStyle = classNames({
			'Star': true,
			'Star_active': favourite
		});
		return (
			<div className={itemStyle} ref="user">
				{ view == 'table' &&
					<div className="User__inner-cell">
						<img className="User__img" src={'/images/'+image+'.svg'}/>
						<span className="User__name">{name}</span>
						<span className="User__age">{age} {pluralize(age, text.age[lang])}</span>
						<span className="User__phone">{phone}</span>
						<span className="User__favorite" onClick={()=>toogleStar(id)}><Star className={starStyle}/></span>
					</div>
				}
				{ view == 'preview' &&
					<div className="User__preview"  onMouseEnter={this.videoPlay.bind(this)} onMouseLeave={this.videoPause.bind(this)}>
						<div className={contentStyle}>
							<div className="User__header" ref="header">
								<img className="User__img" src={'/images/'+image+'.svg'}/>
								<span className="User__name">{name}</span>
								<span className="User__favorite" onClick={()=>toogleStar(id)}><Star className={starStyle}/></span>
							</div>
							<div className="User__inner" ref="inner">
								<div className="User__age">{age} {pluralize(age, text.age[lang])}</div>
								<div className="User__phone">{phone}</div>
								<span className="User__phrase">{phrase}</span>
							</div>
						</div>
						{video &&
							<div className="User__video">
								<video ref="video" loop={true}>
									<source type="video/mp4" src={'/videos/'+video+'.mp4'} />
								</video>
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

export default User