import React, { Component } from 'react';
import { getIsFavouriteUser } from 'utils/helpers.js'
import Waypoint from 'react-waypoint';
import { CSSTransitionGroup } from 'react-transition-group'
import GSAP from 'react-gsap-enhancer';
import { TimelineMax } from 'gsap';
import classNames from 'classnames';
import Star from 'components/Star' 
import styles from './styles.styl';
import text from 'config/text.json';
var timeline = new TimelineMax();
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
		})
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
	// componentWillEnter(callback) {
	// 	this.addAnimation(appearAnim, {callback: callback})
	// }
	// componentWillLeave(callback) {
	// 	this.addAnimation(leaveAnim, {callback: callback})
	// }
	render() {
		let { id, name, image, age, phone, phrase, video, view, lang } = this.props;
		let isFavourite = getIsFavouriteUser(id)
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
			'Star_active': isFavourite
		});
		return (
			<div className={itemStyle}>
				{ view == 'table' &&
					<div name={this.props.i} key={this.props.i} className="User__inner-cell">
						<img className="User__img" src={'/images/'+image+'.svg'}/>
						<span className="User__name">{name}</span>
						<span className="User__age">{age} {text.age[lang]}</span>
						<span className="User__phone">{phone}</span>
						<span className="User__favorite" onClick={()=>this.props.toogleStar(id)}><Star className={starStyle}/></span>
					</div>
				}
				{ view == 'preview' &&
					<div name={this.props.i} key={this.props.i} className="User__preview">
						<div className={contentStyle}>
							<div className="User__header">
								<img className="User__img" src={'/images/'+image+'.svg'}/>
								<span className="User__name">{name}</span>
								<span className="User__favorite" onClick={()=>this.props.toogleStar(id)}><Star className={starStyle}/></span>
							</div>
							<div className="User__age">{age} {text.age[lang]}</div>
							<div className="User__phone">{phone}</div>
							<span className="User__phrase">{phrase}</span>
						</div>
						{video &&
							<div className="User__video">
								<video>
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

export default GSAP()(User)