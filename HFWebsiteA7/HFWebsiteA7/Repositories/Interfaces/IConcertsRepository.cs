﻿using HFWebsiteA7.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HFWebsiteA7.Repositories.Interfaces
{
    interface IConcertsRepository
    {
        IEnumerable<Concert> GetAllConcerts();

        Concert GetConcert(int concertId);

        void AddConcert(Concert concert);

        List<Concert> GetConcertsByDay(int dayId);

        FestivalDay CreateFestivalDay(Day day);

        void UpdateConcert(Concert concert);
        void RemoveConcert(Concert concert);
    }
}
