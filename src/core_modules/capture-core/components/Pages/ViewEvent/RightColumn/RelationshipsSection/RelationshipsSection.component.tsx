import * as React from 'react';
import i18n from '@dhis2/d2-i18n';
import { IconLink24 } from '@dhis2/ui';
import type { ComponentType } from 'react';
import { ViewEventListSection } from '../../Section/ViewEventListSection.component';
import { Relationships } from '../../../../Relationships/Relationships.component';
import { withLoadingIndicator } from '../../../../../HOC/withLoadingIndicator';
import { ConnectedEntity } from './ConnectedEntity';
import type { Entity } from '../../../../Relationships/relationships.types';
import type { PlainProps } from './RelationshipsSection.types';

const LoadingRelationships =
    withLoadingIndicator(null, props => ({ style: props.loadingIndicatorStyle }))(Relationships);

export const RelationshipsSectionComponent: ComponentType<PlainProps> = ({
    programStage,
    eventId,
    orgUnitId,
    relationships,
    ready,
    readOnly,
    onOpenAddRelationship,
    onDeleteRelationship,
}) => {
    const relationshipTypes = programStage.relationshipTypes || [];
    if (relationshipTypes.length === 0) return null;

    const writableRelationshipTypes =
        programStage.relationshipTypesWhereStageIsFrom.filter(rt => rt.access.data.write);

    const count = relationships ? relationships.length : 0;
    const isEmpty = ready && count === 0;

    const renderConnectedEntity = (entity: Entity) => (
        <ConnectedEntity
            type={entity.type}
            name={entity.name}
            id={entity.id}
            orgUnitId={orgUnitId}
            linkProgramId={(entity as any).linkProgramId}
        />
    );

    return (
        <ViewEventListSection
            icon={IconLink24}
            title={i18n.t('Relationships')}
            count={ready ? count : undefined}
            isEmpty={isEmpty}
            emptyMessage={i18n.t("This event doesn't have any relationships")}
            emptyMessageDataTest="relationships-empty-message"
        >
            {React.createElement(LoadingRelationships as any, {
                ready,
                relationships,
                writableRelationshipTypes,
                onOpenAddRelationship,
                onRemoveRelationship: onDeleteRelationship,
                currentEntityId: eventId,
                readOnly,
                smallMainButton: true,
                onRenderConnectedEntity: renderConnectedEntity,
            })}
        </ViewEventListSection>
    );
};
