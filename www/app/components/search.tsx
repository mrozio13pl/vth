import { useDocsSearch } from 'fumadocs-core/search/client';
import { create } from '@orama/orama';
import {
    SearchDialog,
    SearchDialogClose,
    SearchDialogContent,
    SearchDialogHeader,
    SearchDialogIcon,
    SearchDialogInput,
    SearchDialogList,
    SearchDialogOverlay,
    type SharedProps,
} from 'fumadocs-ui/components/dialog/search';
import { BASEPATH } from '@/lib/constants';

function initOrama() {
    return create({
        schema: { _: 'string' },
    });
}

export function Search(props: SharedProps) {
    const { search, setSearch, query } = useDocsSearch({
        type: 'static',
        initOrama,
        from: `${BASEPATH}api/search`,
    });

    return (
        <SearchDialog
            search={search}
            onSearchChange={setSearch}
            isLoading={query.isLoading}
            {...props}
        >
            <SearchDialogOverlay />
            <SearchDialogContent>
                <SearchDialogHeader>
                    <SearchDialogIcon />
                    <SearchDialogInput />
                    <SearchDialogClose />
                </SearchDialogHeader>
                <SearchDialogList items={query.data !== 'empty' ? query.data : null} />
            </SearchDialogContent>
        </SearchDialog>
    );
}
