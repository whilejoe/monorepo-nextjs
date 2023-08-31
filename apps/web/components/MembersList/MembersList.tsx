import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { DateFormatter } from "@internationalized/date";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdChevronRight } from "react-icons/md";
import { Button } from "ui/components/Button";
import { Table, Th, Td, cellAction } from "ui/components/Table";
import { VisuallyHidden } from "ui/components/VisuallyHidden";
import { AccessibleIcon } from "ui/components/AccessibleIcon";
import { Loading } from "ui/components/Loading";
import { Box } from "ui/components/Box";
import { Toast } from "ui/components/Toast";
import { useMembers } from "hooks/useMembers";
import { useCaregiverAsPatient } from "hooks/useCaregiverAsPatient";
import { MemberResponse } from "models/Member";
import { ulReset } from "ui/styles/utils.css";

const columnHelper = createColumnHelper<MemberResponse>();

const MembersList = () => {
  const { push, query, locale } = useRouter();
  const { data, isFetching } = useMembers(query);
  const members = data?.items;

  const {
    mutate,
    isLoading: mutationIsLoading,
    isError,
    reset: resetMutation,
  } = useCaregiverAsPatient();

  const { t } = useTranslation("members");
  const { t: common } = useTranslation("common");

  const columns = useMemo(() => {
    return [
      columnHelper.accessor("firstName", {
        cell: (info) => info.getValue(),
        header: () => t("ColumnHeaderFirstName"),
        size: 120,
      }),
      columnHelper.accessor("lastName", {
        cell: (info) => <Box fontWeight="body">{info.getValue()}</Box>,
        header: () => t("ColumnHeaderLastName"),
      }),
      columnHelper.accessor(
        (row) => row.plans.map((p) => p.memberId).join(" "),
        {
          id: "memberIds",
          cell: (info) => (
            <Box
              as="ul"
              className={ulReset}
              lineHeight={
                info.row.original.plans.length > 1 ? "heading" : undefined
              }
            >
              {info.row.original.plans.map((p, index) => (
                <li key={p.memberId}>
                  {p.memberId}
                  {index + 1 < info.row.original.plans.length && ","}
                </li>
              ))}
            </Box>
          ),
          header: () => t("ColumnHeaderMemberID"),
          size: 135,
        }
      ),
      columnHelper.accessor((row) => row.plans.map((p) => p.group).join(" "), {
        id: "groups",
        cell: (info) => (
          <Box
            as="ul"
            className={ulReset}
            lineHeight={
              info.row.original.plans.length > 1 ? "heading" : undefined
            }
          >
            {info.row.original.plans.map((p, index) => (
              <li key={p.memberId}>
                {p.group}
                {index + 1 < info.row.original.plans.length && ","}
              </li>
            ))}
          </Box>
        ),
        header: () => t("ColumnHeaderGroupName"),
      }),
      columnHelper.accessor("dateOfBirth", {
        cell: (info) => (
          <Box textAlign="right">
            {new DateFormatter(locale || "en-US").format(
              new Date(info.getValue())
            )}
          </Box>
        ),
        header: () => <Box textAlign="right">{t("ColumnHeaderDOB")}</Box>,
        size: 100,
      }),
      columnHelper.accessor("phoneNumber", {
        cell: (info) => <Box textAlign="right">{info.getValue()}</Box>,
        header: () => <Box textAlign="right">{t("ColumnHeaderPhone")}</Box>,
        size: 140,
      }),
      columnHelper.display({
        id: "actions",
        cell: ({ row }) => (
          <Button
            className={cellAction}
            data-automation-hook="select-member-button"
            onClick={() =>
              mutate(
                { id: row.original.patientId },
                { onSuccess: () => push("/") }
              )
            }
            priority={2}
            round
            size="sm"
          >
            <AccessibleIcon
              label={`Select member access for ${row.original.lastName}`}
              icon={<MdChevronRight size={18} />}
            />
          </Button>
        ),
        header: () => <VisuallyHidden>Select Member Action</VisuallyHidden>,
        size: 55,
      }),
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutate, t, locale]);

  const table = useReactTable({
    data: members ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      {!members?.length && (
        <Box
          as="p"
          mb="0x"
          color="muted"
          fontSize="md"
          fontWeight="heading"
          py="2x"
          px="1x"
        >
          {t("NoResultsMessage")}
        </Box>
      )}

      {members && members.length > 0 && (
        <Table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td
                    key={cell.id}
                    verticalAlign="top"
                    letterSpacing="dense"
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Loading show={isFetching || mutationIsLoading} />
      <Toast
        description={common("ErrorMessage")}
        kind="danger"
        open={isError}
        setOpen={resetMutation}
        title={common("Error")}
      />
    </>
  );
};

export { MembersList };
