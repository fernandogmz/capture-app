import * as React from 'react';
import i18n from '@dhis2/d2-i18n';
import { IconMessages24 } from '@dhis2/ui';
import type { ComponentType } from 'react';
import { ViewEventListSection } from '../../Section/ViewEventListSection.component';
import { Notes } from '../../../../Notes/Notes.component';
import { withLoadingIndicator } from '../../../../../HOC/withLoadingIndicator';
import type { PlainProps } from './NotesSection.types';

const LoadingNotes = withLoadingIndicator(null, props => ({ style: props.loadingIndicatorStyle }))(Notes);

export const NotesSectionComponent: ComponentType<PlainProps> = ({
    notes,
    fieldValue,
    onAddNote,
    onUpdateNoteField,
    ready,
    readOnly,
}) => {
    const count = notes ? notes.length : 0;
    const isEmpty = ready && count === 0;
    return (
        <ViewEventListSection
            icon={IconMessages24}
            title={i18n.t('Notes')}
            count={ready ? count : undefined}
            isEmpty={isEmpty}
            emptyMessage={i18n.t("This event doesn't have any notes")}
            emptyMessageDataTest="notes-empty-message"
        >
            {React.createElement(LoadingNotes as any, {
                ready,
                notes,
                readOnly,
                onAddNote,
                onBlur: onUpdateNoteField,
                value: fieldValue,
                smallMainButton: true,
            })}
        </ViewEventListSection>
    );
};
