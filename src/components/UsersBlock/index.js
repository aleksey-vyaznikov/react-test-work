import React, { Component } from 'react';
import Waypoint from 'react-waypoint';
import { TransitionGroup } from 'react-transition-group'
import ReactDOM from 'react-dom';
import User from '../User/';
import classNames from 'classnames';
import text from 'config/text.json';
import styles from './styles.styl'

export default class UsersBlock extends Component {
	constructor(props) {
		super(props)
		this.props.loadUsers();
		this.hasMore = true;
	}
	// handleInfiniteLoad() {
	// 	var self = this;
	// 	if (self.props.load) return;
	// 	self.props.addUsers(self.props.users.length + 1)
	// }
	
	// renderLoading() {
	// 	if(!this.props.load && this.hasMore) return (
	// 		<Waypoint
	// 			onEnter={this.handleInfiniteLoad.bind(this)}
	// 		/>
	// 	)
	// }
	componentDidMount() {
		let list = ReactDOM.findDOMNode(this);
		this.heightList = $(list).height;
	}
	render() {
		this.hasMore = (this.props.users.length < this.props.allCount);
		let { view, lang, userStar } = this.props;
		let style = classNames({
			'UsersBlock__list': true,
			[`UsersBlock__list_${view}`] : view
		})
		return (
			<div className="UsersBlock">
				<div name='UsersBlock__list' className={style}>
					<TransitionGroup>
						{this.props.users.map( (user,i) => 
							<User lang={lang} key={i} num={i} view={view || 'table'}  {...user} toogleStar={userStar} heightList={this.heightList}/>
						)}
					</TransitionGroup>
				</div>
			</div>
		);
	}
}
