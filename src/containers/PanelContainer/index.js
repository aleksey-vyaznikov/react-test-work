import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import PanelButton from 'components/PanelButton';
import SearchField from 'components/SearchField';
import SortIcon from 'components/SortIcon';
import ViewIcon from 'components/ViewIcon';
import styles from './styles.styl'
import text from 'config/text.json';

class Panel extends Component {
	constructor(props) {
		super(props);
		this.setSort = this.setSort.bind(this)
	}
	setSort(props,val) {
		let query =  Object.assign({}, this.props.location.query, { [props]: val })
		this.props.onFilterChange(query);
	}
	render() {
		let {sorting, search, view} = this.props.location.query
		let lang = this.props.lang
		return (
			<div className="Panel">
				<div className="Panel__container">
					<div className="Panel__group Panel__group_search">
						<SearchField defaultValue={search} type="search" onChange={this.setSort} placeholder={text.search[lang]}/>
					</div>
					<div className="Panel__group">
						<div className="Panel__group__title">
							<p className="Panel__group__name">{text.panel.sorting.title[lang]}</p>
						</div>
						<div className="Panel__buttons">
							<PanelButton value="id" type="sorting" onClick={this.setSort} checked={sorting=='id' ? true : false}>
								{text.panel.sorting.items.id[lang]}
							</PanelButton>
							<PanelButton value="name" type="sorting" onClick={this.setSort} checked={sorting=='name' ? true : false} >
								{text.panel.sorting.items.name[lang]}
							</PanelButton>
							<PanelButton value="age" type="sorting" onClick={this.setSort} checked={sorting=='age' ? true : false} >
								{text.panel.sorting.items.age[lang]}
							</PanelButton>
						</div>
					</div>
					<div className="Panel__group">
						<div className="Panel__group__title">
							<p className="Panel__group__name">{text.panel.view.title[lang]}</p>
						</div>
						<div className="Panel__buttons">
							<PanelButton value="table" type="view" onClick={this.setSort} checked={ view=='table' ? true : false} >
								{text.panel.view.items.table[lang]}
							</PanelButton>
							<PanelButton value="preview" type="view" onClick={this.setSort} checked={view=='preview' ? true : false} >
								{text.panel.view.items.preview[lang]}
							</PanelButton>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const { sorting } = state;
	return {
		sorting,
		ownProps
	};
}

function mapDispatchToProps(dispatch, props) {
	let lang = props.params.lang || '';
	return {
		onFilterChange(query) {
			dispatch(push({
				pathname: lang,
				query: query
			}))
		}
	};
}

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(Panel));