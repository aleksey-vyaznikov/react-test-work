import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import ReactDOM from 'react-dom';
import User from '../User/';
import classNames from 'classnames';
import text from 'config/text.json';
import styles from './styles.styl'
import ScrollMagic from 'scrollmagic';
import { CSSTransitionGroup } from 'react-transition-group';


var controller = new ScrollMagic.Controller();

export default class UsersBlock extends Component {
	constructor(props) {
		super(props)
		this.props.loadUsers();
		this.hasMore = true;
	}
	componentDidMount() {
		this.heightList = this.refs.list.offsetHeight;
	}
	componentDidUpdate() {
		this.heightList = this.refs.list.offsetHeight;
	}

	render() {
		let { view, lang, userStar } = this.props;
		let style = classNames({
			'UsersBlock__list': true,
			[`UsersBlock__list_${view}`] : view
		})
		return (
			<div className="UsersBlock" ref="list">
				<div name='UsersBlock__list' className={style}>
					{this.props.users.map( (user,i) => 
						<User lang={lang} key={user.id} num={i} view={view || 'table'} toogleStar={userStar} heightList={this.heightList} controller={controller} {...user}/>
					)}
				</div>
			</div>
		);
	}
}
