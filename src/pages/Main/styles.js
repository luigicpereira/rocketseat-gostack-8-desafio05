import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
	margin-top: 30px;
	display: flex;
	flex-direction: row;
`;

export const RepoInput = styled.input.attrs(() => ({
	type: 'text',
	placeholder: 'Adicionar Repositórios',
}))`
	flex: 1;
	padding: 10px 15px;
	border-radius: 4px;
	font-size: 16px;

	${props =>
		props.inputError
			? css`
					border: 1px solid #f00;
			  `
			: css`
					border: 1px solid #ddd;
			  `}
`;

const rotate = keyframes`
	from{
		transform: rotate(0deg);
	};
	to {
		transform: rotate(360deg);
	}
`;

export const SubmitButton = styled.button.attrs(props => ({
	type: 'submit',
	disabled: props.loading,
}))`
	background: #0a0;
	border: 0;
	padding: 0 15px;
	margin-left: 10px;
	border-radius: 4px;

	display: flex;
	justify-content: center;
	align-items: center;

	&[disabled] {
		cursor: not-allowed;
		opacity: 0.6;
	}

	${props =>
		props.loading &&
		css`
			svg {
				animation: ${rotate} 2s linear infinite;
			}
		`}
`;

export const List = styled.ul`
	list-style: none;
	margin-top: 30px;

	li {
		padding: 15px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		/**
		&: O próprio elemento
		& + li: Aplica a todos os elementos que tem um "li" anterior */
		& + li {
			border-top: 1px solid #eee;
		}

		a {
			color: #0a0;
			text-decoration: none;
		}
	}
`;
