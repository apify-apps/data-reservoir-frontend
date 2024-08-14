import React, { useMemo } from 'react'
import BasicTable from '@/components/common/basic-table/BasicTable';
import Loading from '@/components/common/loading/Loading';
import Paper from '@/components/common/paper/Paper'
import { API_ROUTE } from '@/constant/api-route';
import { request } from '@/utilities/http';
import { useQuery } from '@tanstack/react-query';
import { createColumnHelper, Row } from '@tanstack/react-table';
import { getStaticIndex } from '@/utilities/table';
import { PizzaFrenzyToppingDetailResponse, PizzaFrenzyToppingResponse } from '@/model/response/pizza-frenzy';
import classNames from 'classnames';
import { PIZZA_FRENZY_TOPPING_UPGRADE } from '@/constant/enums';

export default function PizzaFrenzyTable() {
  const { isLoading, data } = useQuery({
    queryKey: ["hayday-building"],
    queryFn: async () => {
      let j = await request <PizzaFrenzyToppingResponse[], {}>({
        method: "GET",
        url: API_ROUTE.PIZZA_FRENZY,
      });
      return (j?.data ?? []);
    }
  });

  const colHelper = createColumnHelper<PizzaFrenzyToppingResponse>();
  const columns = [
    colHelper.display({
      id: 'expand',
      header: (p) => {
        return (<div title='Click to unexpand rows' className='cursor-pointer' onClick={_ => {
          p.table.getRowModel().rows.filter(o => o.getIsExpanded()).forEach(o => o.toggleExpanded(false))
        }}>
          🔴
        </div>)
      },
      cell: (p) => !p.row.getCanExpand() ? '❌' :  (<div className='cursor-pointer text-center text-xl' onClick={p.row.getToggleExpandedHandler()}>{ p.row.getIsExpanded() ? '👇' : '👉' }</div>),
    }),
    colHelper.display({
      id: 'index',
      header: "#",
      cell: ({row, table}) => (<div className='text-center font-bold'>{getStaticIndex(row, table)}</div>),
    }),
    colHelper.display({
      id: "image",
      cell: p => (
        <div className='flex justify-center w-full text-center'>
          <img className='w-16 h-16 rounded-md' src={p.row.original.image} alt={p.row.original.generalName}></img>
        </div>
      ),
      header: "Image"
    }),
    colHelper.accessor('generalName', {
      cell: p => p.getValue(),
      header: "General Name",
      enableSorting: true,
      filterFn: 'includesString',
      meta: {
        filterVariant: 'search'
      }
    })
  ];

  return (
    <Paper className='max-h-[800px] overflow-auto rounded-md'>
      <div className='p-5 inline-block min-w-full'>
        { (isLoading || !data) ? <Loading/> : <BasicTable data={data} columns={columns} expandElement={r => <ExpandMe row={r}/>}/> }
      </div>
    </Paper>
  )
}

interface ExpandMeProps {
  row: Row<PizzaFrenzyToppingResponse>
}

function ExpandMe(props : ExpandMeProps) {
  let memoID = useMemo(() => props.row.original.id, [props.row.original.id]);
  let { data, isLoading } = useQuery({
    queryKey: [memoID],
    queryFn: async () => {
      let j = await request<PizzaFrenzyToppingDetailResponse, {}>({
        method: "GET",
        url: API_ROUTE.PIZZA_FRENZY + `/${memoID}`,
      });
      return (j!.data!);
    },
  });

  if (isLoading) return (<Loading />);
  else if (!data) return (<p>Not found</p>);


  

  return (
    <Paper className='bg-slate-700'>
      <div className='py-3 px-4 grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8'>
        {/* Cards */}

        {
          data.upgrades.map(upgrade => (
            <Paper key={upgrade.id} className={classNames('bg-gradient-to-bl h-80 max-md:h-64 max-sm:h-56 relative', {
              'from-[#6D4F1F] to-[#D4AF79]': upgrade.level as PIZZA_FRENZY_TOPPING_UPGRADE === PIZZA_FRENZY_TOPPING_UPGRADE.BRONZE,
              'from-[#6c6d70] to-[#c3c5c6]': upgrade.level as PIZZA_FRENZY_TOPPING_UPGRADE === PIZZA_FRENZY_TOPPING_UPGRADE.SILVER,
              'from-[#E8A324] to-[#FDF59E]': upgrade.level as PIZZA_FRENZY_TOPPING_UPGRADE === PIZZA_FRENZY_TOPPING_UPGRADE.GOLD,
              'from-[#0b6498] to-[#39baf6]': upgrade.level as PIZZA_FRENZY_TOPPING_UPGRADE === PIZZA_FRENZY_TOPPING_UPGRADE.PLATINUM
            })}>
              <div className='flex flex-col p-0.5'>
                <div className='h-16 flex justify-center items-center rounded-full '>
                  <img src={props.row.original.image} alt={upgrade.name} className='w-16 h-16 max-sm:w-12 max-sm:h-12 rounded-full border-4 border-white/50' />
                </div>
                <div className='row-span-2 flex flex-col justify-between relative items-center p-3 gap-2'>
                  {/* <div className='absolute top-1/2 left-1/2 w-4 h-4'>{upgrade.price}</div> */}
                  <div>
                    <p className='font-bold overflow-y-auto scrollbar-none text-center text-lg'>{upgrade.name}</p>
                  </div>
                  <div className='bg-slate-600/20 p-1 rounded-md h-36 max-md:h-24 max-sm:h-14 overflow-y-auto scrollbar-default w-full'>
                    <p className='text-xs text-justify'>{upgrade.description}</p>
                  </div>
                </div>
              </div>

              <div className='absolute right-0 top-0 font-bold w-8 h-8 bg-slate-800 text-center p-1.5 rounded-full translate-x-2 -translate-y-2'>
                {upgrade.price}
              </div>

            </Paper>
          ))
        }

      </div>
    </Paper>
  )
}