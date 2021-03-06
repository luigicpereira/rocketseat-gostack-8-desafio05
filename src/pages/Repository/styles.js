import styled from 'styled-components';

export const Loading = styled.div`
	color: #555;
	font-size: 30px;
	font-weight: bold;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

export const Owner = styled.header`
	display: flex;
	flex-direction: column;
	align-items: center;

	a {
		color: #0a0;
		font-size: 16px;
		text-decoration: none;
	}

	img {
		width: 120px;
		border-radius: 50%;
		margin-top: 20px;
	}

	h1 {
		font-size: 24px;
		margin-top: 10px;
	}

	p {
		margin-top: 5px;
		font-size: 14px;
		color: #666;
		line-height: 1.4;
		text-align: center;
		max-width: 400px;
	}
`;

export const IssueList = styled.ul`
	padding-top: 30px;
	margin-top: 30px;
	border-top: 1px solid #ddd;
	list-style: none;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;

	select {
		margin-bottom: 10px;
	}

	li {
		display: flex;
		flex: 1;
		width: 100%;
		padding: 15px 10px;
		border: 1px solid #ddd;
		border-radius: 4px;

		& + li {
			margin-top: 10px;
		}

		img {
			width: 36px;
			height: 36px;
			border-radius: 50%;
			border: 2px solid #ddd;
		}

		div {
			flex: 1;
			margin-left: 15px;
			margin-top: 0;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;

			strong {
				font-size: 16px;

				a {
					text-decoration: none;
					color: #333;

					&:hover {
						color: #0a0;
					}
				}

				span {
					background: #ddd;
					color: #333;
					border-radius: 2px;
					font-size: 12px;
					font-weight: 600;
					height: 20px;
					padding: 3px 4px;
					margin-left: 10px;
				}
			}

			p {
				margin-top: 5px;
				font-size: 12px;
				color: #999;
			}
		}
	}

	div {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 10px;

		input[type='button'] {
			border: none;
			background: none;
			margin: 0 15px;
			cursor: pointer;

			&[disabled] {
				cursor: not-allowed;
				opacity: 0.6;
			}
		}
	}
`;
