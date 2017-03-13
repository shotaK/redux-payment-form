import React, {PropTypes, Component} from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as articleActionCreators from '../../redux/article/article.actions';
import ArticleForm from './article-form';

function mapStateToProps(state) {
  return {articles: state.articles};
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(articleActionCreators, dispatch)};
}

@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  handleSubmit = (values) => {
    console.log(values);
    this.props.actions.addArticle(values);
  };

  render() {
    return (
      <div>
        {!this.props.articles.wasAdded && <p>Article Not added</p>}
        {this.props.articles.wasAdded && <p>Article Text: {this.props.articles.text.firstName}</p>}
        <ArticleForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

App.propTypes = {
  articles: PropTypes.object,
  actions: PropTypes.object,
};

