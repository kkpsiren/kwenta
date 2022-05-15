import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import useNetworkSwitcher from 'hooks/useNetworkSwitcher';

import Connector from 'containers/Connector';

import Button from 'components/Button';

import { isWalletConnectedState, networkState } from 'store/wallet';
import { FlexDiv } from 'styles/common';

import WalletActions from '../WalletActions';
import ConnectionDot from '../ConnectionDot';
import BalanceActions from '../BalanceActions';
import NetworksSwitcher from '../NetworksSwitcher';
import { isSupportedNetworkId } from 'utils/network';
import SettingsIcon from 'assets/svg/app/settings.svg';

const WalletButton = () => {
	const { t } = useTranslation();
	const isWalletConnected = useRecoilValue(isWalletConnectedState);
	const network = useRecoilValue(networkState);
	const { connectWallet } = Connector.useContainer();
	const [settingsModalOpened, setSettingsModalOpened] = React.useState<boolean>(false);
	const [uniswapWidgetOpened, setUniswapWidgetOpened] = React.useState<boolean>(false);
	const { switchToL2 } = useNetworkSwitcher();

	const walletIsNotConnected = (
		<CTARow>
			<ConnectButton
				size="sm"
				variant="outline"
				onClick={connectWallet}
				data-testid="connect-wallet"
				mono
			>
				<StyledConnectionDot />
				{t('common.wallet.connect-wallet')}
			</ConnectButton>
		</CTARow>
	);

	const walletIsConnectedButNotSupported = (
		<CTARow>
			<SwitchToL2Button variant="secondary" onClick={switchToL2}>
				{t('homepage.l2.cta-buttons.switch-l2')}
			</SwitchToL2Button>
			<ConnectButton size="sm" variant="outline" data-testid="unsupported-network" mono>
				<StyledConnectionDot />
				{t('common.wallet.unsupported-network')}
			</ConnectButton>
		</CTARow>
	);

	const walletIsConnectedAndSupported = (
		<>
			<BalanceActions
				uniswapWidgetOpened={uniswapWidgetOpened}
				setShowUniswapWidget={setUniswapWidgetOpened}
			/>
			<NetworksSwitcher />
			<WalletActions />
			<MenuButton
				onClick={() => {
					setSettingsModalOpened(!settingsModalOpened);
				}}
				isActive={settingsModalOpened}
			>
				<SettingsIcon width={20} />
			</MenuButton>
		</>
	);

	return isWalletConnected
		? isSupportedNetworkId(network.id)
			? walletIsConnectedAndSupported
			: walletIsConnectedButNotSupported
		: walletIsNotConnected;
};

const StyledConnectionDot = styled(ConnectionDot)`
	margin-right: 6px;
`;

const MenuButton = styled(Button)`
	display: flex;
	align-items: center;
	margin-left: 15px;
`;

const ConnectButton = styled(Button)`
	font-size: 13px;
`;

const SwitchToL2Button = styled(Button)`
	font-size: 13px;
	color: ${(props) => props.theme.colors.common.primaryWhite};
	font-family: ${(props) => props.theme.fonts.mono};
`;

const CTARow = styled(FlexDiv)`
	button:first-child {
		margin-right: 15px;
	}
	button:only-child {
		margin-right: 0px;
	}
`;

export default WalletButton;