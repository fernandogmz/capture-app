import * as React from 'react';
import { colors, spacersNum } from '@dhis2/ui';
import { withStyles, type WithStyles } from 'capture-core-utils/styles';
import { ViewEventSection } from './ViewEventSection.component';
import { ViewEventSectionHeader } from './ViewEventSectionHeader.component';

const getStyles = (theme: any) => ({
    badge: {
        backgroundColor: theme.palette.grey.light,
    },
    emptyMessage: {
        fontSize: 14,
        color: colors.grey600,
        paddingBottom: spacersNum.dp8,
    },
});

type Props = {
    icon: React.ComponentType;
    title: string;
    count?: number;
    isEmpty: boolean;
    emptyMessage: string;
    emptyMessageDataTest?: string;
    children?: React.ReactNode;
};

const ViewEventListSectionPlain = ({
    icon,
    title,
    count,
    isEmpty,
    emptyMessage,
    emptyMessageDataTest,
    children,
    classes,
}: Props & WithStyles<typeof getStyles>) => (
    <ViewEventSection
        collapsable
        header={(
            <ViewEventSectionHeader
                icon={icon}
                text={title}
                badgeClass={classes.badge}
                badgeCount={count}
            />
        )}
    >
        {isEmpty && (
            <div className={classes.emptyMessage} data-test={emptyMessageDataTest}>
                {emptyMessage}
            </div>
        )}
        {children}
    </ViewEventSection>
);

export const ViewEventListSection = withStyles(getStyles)(ViewEventListSectionPlain);
