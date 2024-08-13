var defaultEvents = [],
  viewEventModal = new bootstrap.Modal(
    document.getElementById("view-event-modal"),
    { keyboard: !1 }
  ),
  addEditEventModal = new bootstrap.Modal(
    document.getElementById("add-edit-event-modal"),
    { keyboard: !1 }
  ),
  formEvent = document.getElementById("add-event-form"),
  addEventButton = document.getElementById("add-new-event-btn"),
  updateEventButton = document.getElementById("update-event-btn"),
  todayDate = moment().startOf("day"),
  YM = todayDate.format("YYYY-MM"),
  TODAY = todayDate.format("YYYY-MM-DD"),
  defaultEvents = [
    {
      id: 1,
      title: "Company Meeting",
      start: YM + "-05",
      end: null,
      description: "Lorem ipsum dolor sit tempor incid",
      className: "bg-primary",
      location: "San Francisco, US",
      start_time: "19:30:00",
      end_time: "20:00:00",
    },
    {
      id: 999,
      title: "Repeating Event",
      start: YM + "-09T16:00:00",
      description: "Lorem ipsum dolor sit ncididunt ut labore",
    },
    {
      id: 2,
      title: "Mexo 2023 - Product Release",
      start: YM + "-02",
      end: YM + "-04",
      description: "Mexo 2021 - Lorem ipsum dolor sit tempor inci",
      className: "bg-info",
      location: "Las Vegas, US",
      start_time: null,
      end_time: null,
    },
    {
      id: 3,
      title: "Click for Google",
      url: "http://google.com/",
      start: YM + "-28",
      end: null,
      description: "Lorem ipsum dolor sit amet, labore",
      className: "bg-primary",
      location: "Online",
      start_time: "17:30:00",
      end_time: "18:30:00",
    },
  ],
  config = { dateFormat: "Y-m-d H:i:S", enableTime: !0 };
flatpickr("#eventStart", config), flatpickr("#eventEnd", config);
const getInitialView = () =>
    768 <= window.innerWidth && window.innerWidth < 1200
      ? "timeGridWeek"
      : window.innerWidth <= 768
      ? "listMonth"
      : "dayGridMonth",
  getDateValue =
    (document.addEventListener("DOMContentLoaded", function () {
      var e = document.getElementById("create-new-event-btn"),
        t = document.getElementById("btn-delete-event"),
        n = document.getElementById("btn-edit-event"),
        l = null,
        d = document.getElementById("drop-remove"),
        a = document.getElementById("calendar"),
        r = new FullCalendar.Calendar(a, {
          headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          },
          droppable: !0,
          height: 900,
          contentHeight: 800,
          aspectRatio: 3,
          nowIndicator: !0,
          now: TODAY + "T09:25:00",
          initialView: getInitialView(),
          initialDate: TODAY,
          editable: !0,
          dayMaxEvents: !0,
          navLinks: !0,
          displayEventTime: !1,
          drop: function (e) {
            d.checked && e.draggedEl.parentNode.removeChild(e.draggedEl);
          },
          windowResize: function (e) {
            var t = getInitialView();
            r.changeView(t);
          },
          dateClick: function (e) {
            u(),
              (document.getElementById("event-id").value =
                defaultEvents.length + 1);
            var t = new Date();
            let n = e.date;
            e = {
              dateFormat: "Y-m-d H:i:S",
              enableTime: !0,
              defaultDate: [
                (n = new Date(n.setHours(t.getHours(), t.getMinutes(), 0, 0))),
              ],
            };
            flatpickr("#eventStart", e).redraw(),
              flatpickr("#eventEnd", e).redraw(),
              addEventButton.removeAttribute("hidden"),
              updateEventButton.setAttribute("hidden", !0),
              addEditEventModal.show();
          },
          eventReceive: function (e) {
            e = {
              id: Math.floor(11e3 * Math.random()),
              title: e.event.title,
              start: e.event.start,
              allDay: e.event.allDay,
              location: "Not Location",
              className: e.event.classNames[0],
            };
            defaultEvents.push(e);
          },
          eventClick: function (e) {
            if (((l = e.event), e.event.url)) return !1;
            var e = l.title,
              t =
                void 0 === l.extendedProps.description
                  ? "No Description"
                  : l.extendedProps.description,
              n =
                void 0 === l.extendedProps.location
                  ? "No Location"
                  : l.extendedProps.location,
              d = l.id;
            (document.getElementById("view-event-modal-title").innerHTML = e),
              (document.getElementById("view-event-dates").innerHTML =
                eventDates(l.start, l.end)),
              (document.getElementById("view-event-location").innerHTML = n),
              (document.getElementById("view-event-description").innerHTML = t),
              (document.getElementById("selected-event-id").value = d),
              viewEventModal.show();
          },
          events: defaultEvents,
        });
      document.body.contains(e) &&
        e.addEventListener("click", function () {
          u(),
            (l = null),
            addEventButton.removeAttribute("hidden"),
            updateEventButton.setAttribute("hidden", !0),
            (document.getElementById("event-id").value =
              defaultEvents.length + 1);
        });
      const u = () => {
        (document.getElementById("event-category").value = "bg-primary"),
          (document.getElementById("event-title").value = ""),
          (document.getElementById("event-description").value = ""),
          (document.getElementById("event-location").value = ""),
          (document.getElementById("event-id").value = "");
        var e = {
          dateFormat: "Y-m-d H:i:S",
          defaultDate: [new Date()],
          enableTime: !0,
        };
        flatpickr("#eventStart", e),
          flatpickr("#eventEnd", e),
          (l = null),
          (action = "");
      };
      r.render(),
        document.body.contains(t) &&
          t.addEventListener("click", function (e) {
            var t = document.getElementById("selected-event-id").value;
            confirm("Are you sure want to delete this event ?") &&
              (r.getEventById(t).remove(), viewEventModal.hide());
          }),
        document.body.contains(n) &&
          n.addEventListener("click", function (e) {
            updateEventButton.removeAttribute("hidden"),
              addEventButton.setAttribute("hidden", !0);
            var t = l.id,
              n = l.title,
              d =
                void 0 === l.extendedProps.description
                  ? "No Description"
                  : l.extendedProps.description,
              a =
                void 0 === l.extendedProps.location
                  ? "No Location"
                  : l.extendedProps.location,
              i = void 0 === l.start || null === l.start ? "-" : l.start,
              o = void 0 === l.end || null === l.end ? null : l.end,
              n =
                ((document.getElementById(
                  "add-edit-event-modal-title"
                ).innerHTML = "Edit - " + n),
                (document.getElementById("event-title").value = n),
                (document.getElementById("event-description").value = d),
                (document.getElementById("event-location").value = a),
                (document.getElementById("event-id").value = t),
                (document.getElementById("event-category").value =
                  l.classNames),
                viewEventModal.hide(),
                document.getElementById("eventStart").flatpickr().clear(),
                document.getElementById("eventEnd").flatpickr().clear(),
                {
                  dateFormat: "Y-m-d H:i:S",
                  defaultDate: [new Date(i)],
                  enableTime: !0,
                }),
              n =
                (flatpickr("#eventStart", n).redraw(),
                {
                  dateFormat: "Y-m-d H:i:S",
                  defaultDate: [new Date(o)],
                  enableTime: !0,
                });
            flatpickr("#eventEnd", n).redraw(), addEditEventModal.show();
          }),
        document.body.contains(formEvent) &&
          formEvent.addEventListener("submit", function (e) {
            e.preventDefault();
            var e = document.getElementById("event-title").value,
              t = document.getElementById("event-category").value,
              n = document.getElementById("event-description").value,
              d = document.getElementById("event-location").value,
              a = document.getElementById("eventStart").value,
              i = document.getElementById("eventEnd").value,
              o = document.getElementById("event-id").value;
            l
              ? (l.setProp("id", o),
                l.setProp("title", e),
                l.setProp("classNames", [t]),
                l.setStart(a),
                l.setEnd(i),
                l.setAllDay(!1),
                l.setExtendedProp("description", n),
                l.setExtendedProp("location", d),
                (o = defaultEvents.findIndex(function (e) {
                  return e.id == l.id;
                })),
                defaultEvents[o] &&
                  ((defaultEvents[o].title = e),
                  (defaultEvents[o].start = a),
                  (defaultEvents[o].end = i),
                  (defaultEvents[o].allDay = !1),
                  (defaultEvents[o].className = t),
                  (defaultEvents[o].description = n),
                  (defaultEvents[o].location = d)),
                r.render())
              : ((o = {
                  id: defaultEvents.length + 1,
                  title: e,
                  start: new Date(a),
                  end: new Date(i),
                  className: t,
                  description: n,
                  location: d,
                  allDay: !1,
                }),
                r.addEvent(o),
                defaultEvents.push(o)),
              addEditEventModal.hide(),
              u();
          });
    }),
    (e) => {
      var e = new Date(e),
        t =
          "" +
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ][e.getMonth()],
        n = "" + e.getDate(),
        d = e.getFullYear(),
        a = e.getHours() % 12 || 12,
        e = e.getMinutes();
      return (
        t.length < 2 && (t = "0" + t),
        [
          (n = n.length < 2 ? "0" + n : n) + " " + t,
          d +
            " " +
            a +
            ":" +
            ("0" + e).slice(-2) +
            " " +
            (12 <= a ? "PM" : "AM"),
        ].join(",")
      );
    }),
  eventDates = (e, t) => {
    (e = new Date(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes()
    )),
      (t =
        null == t
          ? null
          : new Date(
              t.getFullYear(),
              t.getMonth(),
              t.getDate(),
              t.getHours(),
              t.getMinutes()
            ));
    return e < t
      ? "<b>From :</b> " +
          getDateValue(e) +
          " <br/><b>To :</b>" +
          getDateValue(t)
      : getDateValue(e);
  };
