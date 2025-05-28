import { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EventInput, DateSelectArg, EventClickArg } from "@fullcalendar/core";
import "./Calendar.css";
import { useModal } from "../hooks/useModal";

// Interfaces
interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

// Constantes
const calendarsEvents = {
  Danger: "Prioridad alta",
  Success: "Prioridad baja",
  Primary: "Prioridad media",
  Warning: "Prioridad 100%",
};

const dayMap: Record<string, number> = {
  DOMINGO: 0,
  LUNES: 1,
  MARTES: 2,
  MIERCOLES: 3,
  JUEVES: 4,
  VIERNES: 5,
  SABADO: 6,
};

// Render personalizado para los eventos
const renderEventContent = (eventInfo: any) => {
  const calendarLevel = eventInfo.event.extendedProps?.calendar?.toLowerCase() || "primary";
  const colorClass = `fc-bg-${calendarLevel}`;

  return (
    <div className={`event-fc-color flex fc-event-main ${colorClass} p-1 rounded-sm`}>
      <div className="fc-daygrid-event-dot"></div>
      <div className="fc-event-time">{eventInfo.timeText || ""}</div>
      <div className="fc-event-title">{eventInfo.event.title || "Evento sin título"}</div>
    </div>
  );
};

// Componente principal
const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventLevel, setEventLevel] = useState("Primary");

  const calendarRef = useRef<FullCalendar>(null);
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/clase/lista");

        const data = await response.json();

        const filteredEvents = data.filter((item: any) =>
          item.docente?.toUpperCase() === "LUZ MARY CONTRERAS MEZA"
        );

        const mappedEvents: CalendarEvent[] = filteredEvents.map((item: any) => {
          const dayIndex = dayMap[item.dia?.toUpperCase()] ?? 0;

          return {
            id: item.id?.toString(),
            title: item.docente || "Sin docente",
            daysOfWeek: [dayIndex],
            startTime: item.horaInicio,
            endTime: item.horaFin,
            startRecur: "2025-05-01",
            endRecur: "2025-07-01",
            extendedProps: {
              calendar: "Primary",
            },
          };
        });

        setEvents(mappedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const resetModalFields = () => {
    setEventTitle("");
    setEventStartDate("");
    setEventEndDate("");
    setEventLevel("Primary");
    setSelectedEvent(null);
  };

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    resetModalFields();
    setEventStartDate(selectInfo.startStr || "");
    setEventEndDate(selectInfo.endStr || selectInfo.startStr || "");
    openModal();
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;

    setSelectedEvent({
      id: event.id,
      title: event.title || "",
      start: event.start?.toISOString() || "",
      end: event.end?.toISOString() || "",
      extendedProps: {
        calendar: event.extendedProps?.calendar || "Primary",
      },
    });

    setEventTitle(event.title || "");
    setEventStartDate(event.start?.toISOString().split("T")[0] || "");
    setEventEndDate(event.end?.toISOString().split("T")[0] || "");
    setEventLevel(event.extendedProps?.calendar || "Primary");
    openModal();
  };

  const handleAddOrUpdateEvent = () => {
    if (!eventTitle) {
      alert("El título es obligatorio");
      return;
    }

    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: eventTitle,
                start: eventStartDate,
                end: eventEndDate,
                extendedProps: { calendar: eventLevel },
              }
            : event
        )
      );
    } else {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventTitle,
        start: eventStartDate,
        end: eventEndDate,
        allDay: true,
        extendedProps: { calendar: eventLevel },
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }

    closeModal();
    resetModalFields();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={esLocale}
          headerToolbar={{
            left: "prev,next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          selectable={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
          customButtons={{
            addEventButton: {
              text: "Agregar Reunión Personal +",
              click: () => {
                resetModalFields();
                openModal();
              },
            },
          }}
        />
      </div>

      {/* MODAL */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
          onClick={() => {
            closeModal();
            resetModalFields();
          }}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg z-[10000]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">
              {selectedEvent ? "Editar Evento" : "Nuevo Evento"}
            </h2>

            <label className="block mb-2 font-medium">Título</label>
            <input
              type="text"
              className="border rounded p-2 w-full mb-4"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Escribe el título"
            />

            <label className="block mb-2 font-medium">Fecha inicio</label>
            <DatePicker
              selected={eventStartDate ? new Date(eventStartDate) : null}
              onChange={(date: Date | null) => {
                if (date) setEventStartDate(date.toISOString().split("T")[0]);
              }}
              className="border rounded p-2 w-full mb-4"
              dateFormat="yyyy-MM-dd"
            />

            <label className="block mb-2 font-medium">Fecha fin</label>
            <DatePicker
              selected={eventEndDate ? new Date(eventEndDate) : null}
              onChange={(date: Date | null) => {
                if (date) setEventEndDate(date.toISOString().split("T")[0]);
              }}
              className="border rounded p-2 w-full mb-4"
              dateFormat="yyyy-MM-dd"
            />

            <label className="block mb-2 font-medium">Categoría</label>
            <select
              className="border rounded p-2 w-full mb-4"
              value={eventLevel}
              onChange={(e) => setEventLevel(e.target.value)}
            >
              {Object.entries(calendarsEvents).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => {
                  closeModal();
                  resetModalFields();
                }}
              >
                Cancelar
              </button>
              <button
                className="bg-[#ed2e91] hover:bg-[#d41e7c] text-white px-4 py-2 rounded"
                onClick={handleAddOrUpdateEvent}
                disabled={!eventTitle || !eventStartDate || !eventEndDate}
              >
                {selectedEvent ? "Guardar" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
