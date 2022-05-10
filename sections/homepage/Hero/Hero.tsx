import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import LogoNoTextSVG from 'assets/svg/brand/logo-no-text.svg';
import MarketOrderPreview from 'assets/png/marketing/market-order-preview.png';

import { GridDiv, Paragraph } from 'styles/common';
import { StackSection } from '../common';

import media from 'styles/media';
import Link from 'next/link';
import Button from 'components/Button';
import ROUTES from 'constants/routes';
import PoweredBySynthetix from 'components/PoweredBySynthetix';
import Webp from 'components/Webp';

const Hero = () => {
	const { t } = useTranslation();

	return (
		<StackSection>
			<LogoNoTextSVG />
			<Header>{t('homepage.hero.title')}</Header>
			<ProductDescription>
				Trade commodities, forex, crypto, and more with up to 10x leverage and deep liquidity.
			</ProductDescription>
			<SynthetixContainer>
				<PoweredBySynthetix />
			</SynthetixContainer>
			<CTAContainer>
				<Link href={ROUTES.Home.Overview}>
					<Button variant="primary" isRounded={false} size="md">
						{t('homepage.nav.trade-now')}
					</Button>
				</Link>
			</CTAContainer>
			<HeroImageContainer>
				<Webp srcOrSrcset={MarketOrderPreview} StyledImg={HeroImage} />
			</HeroImageContainer>
		</StackSection>
	);
};

const Header = styled(Paragraph)`
	font-family: ${(props) => props.theme.fonts.compressedBlack};
	max-width: 636px;
	font-size: 80px;
	line-height: 85%;
	text-align: center;
	text-transform: uppercase;
	color: ${(props) => props.theme.colors.common.primaryGold};
	text-shadow: 0px 0px 62px rgba(208, 168, 117, 0.35);
	padding-top: 40px;
`;

const ProductDescription = styled(Paragraph)`
	font-family: ${(props) => props.theme.fonts.regular};
	max-width: 530px;
	font-size: 24px;
	line-height: 120%;
	text-align: center;
	color: ${(props) => props.theme.colors.common.secondaryGray};
	padding-top: 16px;
`;
const HeroImageContainer = styled(GridDiv)`
	width: 100vw;
	overflow: hidden;
	display: grid;
	justify-content: center;
	margin-top: 97px;
	min-height: 839px;
	${media.lessThan('md')`
		min-height: 684px;
	`}
	${media.lessThan('sm')`
		margin-top: 0;
		min-height: 338px;
	`}
`;

const HeroImage = styled(Img)`
	max-width: 964px;
	${media.lessThan('md')`
		width: 785px;
	`}
	${media.lessThan('sm')`
		width: 380px;
	`}
`;

const SynthetixContainer = styled.div`
	margin: 25px 0px 0px 0;
`;

const CTAContainer = styled.div`
	margin: 50px 0px 0px 0;
	z-index: 1;
`;

export default Hero;
