import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, RepoInput, SubmitButton, List } from './styles';

export default class Main extends Component {
	state = {
		newRepo: '',
		repositories: [],
		loading: false,
		inputError: false,
	};

	// Criação deste componente
	// Carrega dados do localStorage
	componentDidMount() {
		const repositories = localStorage.getItem('repositories');

		if (repositories) {
			this.setState({ repositories: JSON.parse(repositories) });
		}
	}

	// Atualização deste componente
	// Salva dados no localStorage
	// O primeiro parâmetro seria previous props
	componentDidUpdate(_, prevState) {
		const { repositories } = this.state;

		if (prevState.repositories !== repositories) {
			localStorage.setItem('repositories', JSON.stringify(repositories));
		}
	}

	handleInputChange = e => {
		this.setState({ newRepo: e.target.value });
	};

	handleSubmit = async e => {
		try {
			e.preventDefault();

			this.setState({
				loading: true,
				inputError: false,
			});

			const { newRepo, repositories } = this.state;

			if (
				repositories.filter(
					repository => repository.name.toUpperCase() === newRepo.toUpperCase()
				).length > 0
			) {
				console.log('1');
				throw new Error('Repositório duplicado');
			} else {
				console.log('2');
			}

			const response = await api.get(`/repos/${newRepo}`);

			const data = {
				name: response.data.full_name,
			};

			this.setState({
				repositories: [...repositories, data],
				newRepo: '',
				loading: false,
			});
		} catch (error) {
			console.log(error);

			this.setState({
				inputError: true,
				loading: false,
			});
		}
	};

	render() {
		const { newRepo, repositories, loading, inputError } = this.state;

		return (
			<Container>
				<h1>
					<FaGithubAlt />
					Repositórios
				</h1>

				<Form onSubmit={this.handleSubmit}>
					<RepoInput
						value={newRepo}
						onChange={this.handleInputChange}
						inputError={inputError ? 1 : undefined}
					/>

					<SubmitButton loading={loading ? 1 : undefined}>
						{loading ? (
							<FaSpinner color="#FFF" size={14} />
						) : (
							<FaPlus color="#FFF" size={14} />
						)}
					</SubmitButton>
				</Form>

				<List>
					{repositories.map(repository => (
						<li key={repository.name}>
							<span>{repository.name}</span>
							<Link to={`/repository/${encodeURIComponent(repository.name)}`}>
								Detalhes
							</Link>
						</li>
					))}
				</List>
			</Container>
		);
	}
}
