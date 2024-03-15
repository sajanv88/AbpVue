<script setup lang="ts" generic="TData, TValue">
import {
  type ColumnDef,
  getSortedRowModel,
  type Header,
  type RowData,
  type SortingState,
} from "@tanstack/vue-table";
import { FlexRender, getCoreRowModel, useVueTable } from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/abp/ui/table";
import { Card } from "~/abp/ui/card";
import Icon from "~/components/shared/Icon.vue";
import { valueUpdater } from "~/lib/utils";

const props = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}>();

const emit = defineEmits(["onSortingChange"]);
const sorting = ref<SortingState>([]);
const onSortEvent = (header: Header<RowData, unknown>) => {
  header.column.toggleSorting(header.column.getIsSorted() === "asc");
  emit("onSortingChange", sorting.value[0].desc ? "desc" : "asc");
};
const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return props.columns;
  },
  getCoreRowModel: getCoreRowModel(),
  manualSorting: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  state: {
    get sorting() {
      return sorting.value;
    },
  },
});
</script>

<template>
  <Card>
    <div class="overflow-x-auto overflow-y-auto min-h-fit max-h-[34rem]">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="bg-primary-foreground"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              @click="onSortEvent(header)"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <Icon
                :key="table.getState().sorting"
                :icon="
                  table.getState().sorting[0]?.desc ? 'chev-up' : 'chev-down'
                "
                :w="16"
                :h="16"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow v-for="row in table.getRowModel().rows" :key="row.id">
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>
          <template v-else>
            <TableRow>
              <TableCell :colSpan="columns.length" class="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
  </Card>
</template>

<style scoped></style>
