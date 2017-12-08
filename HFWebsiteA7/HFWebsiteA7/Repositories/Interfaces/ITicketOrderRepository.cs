﻿using HFWebsiteA7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFWebsiteA7.Repositories.Interfaces
{
    interface ITicketOrderRepository
    {
        IEnumerable<TicketOrder> GetAllTicketOrders();
        TicketOrder GetTicketOrder(int ticketOrderId);
        void AddTicketOrder(TicketOrder ticketOrder);
    }
}