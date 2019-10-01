import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList } from './styles';

// export default function Repository(props) {
// export default function Repository({ match }) {
export default class Repository extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({
				repository: PropTypes.string,
			}),
		}).isRequired,
	};

	state = {
		repository: {},
		issueType: 'open',
		issuePage: 1,
		issuesPerPage: 5,
		issues: [],
		loading: true,
	};

	async componentDidMount() {
		const { match } = this.props;

		const repoName = decodeURIComponent(match.params.repository);

		const { issuesPerPage } = this.state;

		const type = localStorage.getItem('currentType') || 'open';
		const page = parseInt(localStorage.getItem('currentPage'), 10) || 1;

		const [repository, issues] = await Promise.all([
			api.get(`/repos/${repoName}`),
			api.get(`/repos/${repoName}/issues`, {
				// Query Params
				// /repos/${repoName}/issues?state=open...
				params: {
					state: type,
					per_page: issuesPerPage,
					page,
				},
			}),
		]);

		this.setState({
			repository: repository.data,
			issues: issues.data,
			loading: false,
			issueType: type,
			issuePage: page,
		});
	}

	handleIssueType = async event => {
		const newIssueType = event.target.value;

		const { repository } = this.state;

		const issues = await api.get(`/repos/${repository.full_name}/issues`, {
			// Query Params
			// /repos/${repoName}/issues?state=open...
			params: {
				state: newIssueType,
				per_page: 5,
				page: 1,
			},
		});

		localStorage.setItem('currentType', newIssueType);

		this.setState({
			issues: issues.data,
			issueType: newIssueType,
			issuePage: 1,
		});
	};

	handleNextPage = () => {
		const { issuePage } = this.state;
		const newPage = issuePage + 1;

		this.setState({ issuePage: newPage });
		this.changePage(newPage);
	};

	handlePreviousPage = () => {
		const { issuePage } = this.state;
		const newPage = issuePage > 1 ? issuePage - 1 : 1;

		this.setState({ issuePage: newPage });
		this.changePage(newPage);
	};

	changePage = async newPage => {
		localStorage.setItem('currentPage', newPage);

		const { repository, issueType } = this.state;

		const issues = await api.get(`/repos/${repository.full_name}/issues`, {
			// Query Params
			// /repos/${repoName}/issues?state=open...
			params: {
				state: issueType,
				per_page: 5,
				page: newPage,
			},
		});

		this.setState({
			issues: issues.data,
			issuePage: newPage,
		});
	};

	reloadIssues = () => {};

	render() {
		const {
			repository,
			issues,
			loading,
			issueType,
			issuePage,
			issuesPerPage,
		} = this.state;

		if (loading) {
			return <Loading>Carregando</Loading>;
		}

		return (
			<Container>
				<Owner>
					<Link to="/">Voltar aos repositórios</Link>
					<img src={repository.owner.avatar_url} alt={repository.owner.login} />
					<h1>{repository.name}</h1>
					<p>{repository.description}</p>
				</Owner>

				<IssueList>
					<select onChange={this.handleIssueType} value={issueType}>
						<option value="open">Aberta</option>
						<option value="closed">Fechada</option>
						<option value="all">Todas</option>
					</select>

					{issues.map(issue => (
						<li key={String(issue.id)}>
							<img src={issue.user.avatar_url} alt={issue.user.login} />
							<div>
								<strong>
									<a href={issue.html_url}>{issue.title}</a>
									{issue.labels.map(label => (
										<span key={String(label.id)}>{label.name}</span>
									))}
								</strong>
								<p>{issue.user.login}</p>
							</div>
						</li>
					))}

					<div>
						<input
							type="button"
							value="Página Anterior"
							disabled={issuePage <= 1 ? 'disabled' : ''}
							onClick={this.handlePreviousPage}
						/>
						<input
							type="button"
							value="Próxima Página"
							disabled={issues.length < issuesPerPage ? 'disabled' : ''}
							onClick={this.handleNextPage}
						/>
					</div>
				</IssueList>
			</Container>
		);
	}
}
