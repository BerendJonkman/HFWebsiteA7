﻿using HFWebsiteA7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFWebsiteA7.Repositories
{
    interface IConcertsRepository
    {
        IEnumerable<Concert> GetAllConcerts();
        Concert GetConcert(int concertId);
        void AddConcert(Concert concert);
    }
}